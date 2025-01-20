import { Router } from 'express';
const router = Router();

import {getAllUSers,
    getUserById,
    createUser,
    updateUser,
    deleteuser,
    addfriend,
    deleteFriend
} from  '../../controllers/userController.js'

// /api/user
router.route('/').get(getAllUSers);

// /api/user/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteuser);

// /api/user/:userId/friends
router.route('/:userId/friends/').post(addfriend);
router.route('/:userId/friends/:friendId').delete(deleteFriend);

// /api/user/
 router.route('/').post(createUser);


export { router as UserRouter} ;