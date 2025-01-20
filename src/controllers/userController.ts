
import {Request,Response} from 'express';
import mongoose from 'mongoose';
import {User,Thought} from '../models/index.js';

/**
 * get all users
 * @param _req 
 * @param res 
 */
export const getAllUSers = async (_req:Request,res:Response) =>{
    try{
        const users = await User.find();
      res.json(users);
    }catch(error:any) {
        res.status(500).json({
            message:error.message 
        })
      return;
    }
}

/**
 *  Get users by id /users/:id
 * 
 *  */

export const getUserById = async (req:Request,res:Response) =>{
    const {userId} = req.params;
    try{
        const use = await User.findById(userId);
        if(use){
            res.json(use);
        }else{
            res.status(404).json({
                message:'User not found'
            });
        }

    }catch (error:any){
        res.status(500).json({
            message:error.message
        });
    }
};

export const createUser = async (req: Request, res: Response) => {
    const { username, email } = req.body;
    try {
      const newuser = await User.create({
        username,
        email,
      });
      res.status(201).json(newuser);
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

/**
 * PUT user based on username /users/:userid
 *
 * @returns a single user object
*/
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Check if the provided ID is a valid ObjectId
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   return res.status(400).json({ message: 'Invalid user ID!' });
    // }

    const user = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }

    return res.json(user);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
}; 

   /**
 * DELETE Course based on id /courses/:id
 * @param string id
 * @returns string 
*/
export const deleteuser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
       return res.status(404).json({ message: 'User not found' });
    }

    // Delete associated thoughts
    await Thought.deleteMany({ username: user.username });

    // Delete the user
    await user.deleteOne();

    return res.status(200).json({ message: 'User and associated thoughts deleted successfully' });
  } catch (error:any) {
    return res.status(500).json({ message: error.message });
  }
}
//   try {
//     const { userId } = req.params;
//     console.log(userId);

//     // Validate if the userId is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: 'Invalid user ID' });
//     }

//     // Find the user by ID and delete it
//     const user = await User.findByIdAndDelete(userId);

//     // If no user is found, return a 404 error
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     return res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error:any) {
//     return res.status(500).json({ message: error.message });
//   }
// };

  export const addfriend = async (req: Request, res: Response) => {
      try {
        const { userId } = req.params;
        const { friendId } = req.body;
    
        // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(friendId)) {
          return res.status(400).json({ message: 'Invalid friend ID' });
        }
    
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Add friend
        user.friends.push(friendId);
        await user.save();
    
        return res.status(200).json({ message: 'Friend added successfully', user });
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    }
 
// to delete a friend.
///api/users/:userId/friends/:friendId

export const deleteFriend = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { friendId } = req.params;

    // Validate userId and friendId
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(friendId)) {
      return res.status(400).json({ message: 'Invalid user or friend ID' });
    }

    // Find the user and remove the friend
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } }, // Remove the friendId from the friends array
      { new: true } // Return the updated user document
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Friend removed successfully', user });
  } catch (error : any) {
    return res.status(500).json({ message: error.message });
  }
}


  
 