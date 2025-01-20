import { Thought,User } from "../models/index.js";
import { Request, Response } from "express";
import mongoose from 'mongoose';
import { IReaction } from '../models/reaction.js';

export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const Thoughts = await Thought.find();
      res.json(Thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findById(thoughtId);
      if (thought) {
        res.json(thought);
      } else {
        res.status(404).json({
          message: 'Thought not found'
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const createThought = async (req: Request, res: Response) => {
    const { thoughtText,username, userId } = req.body;
    try {
        const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

      const newThought = await Thought.create({
        thoughtText,
        username, 
        userId
      });
    //   return res.status(201).json(newThought);
    user.thoughts.push(newThought._id as mongoose.Schema.Types.ObjectId);
    await user.save();

    return res.status(201).json({ message: 'Thought created successfully', newThought });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message
      });
    }
  }; 

    export const updateThought = async (req: Request, res: Response) => {
    //     const { thoughtId } = req.params;
    //     const { thoughtText } = req.body;
    //     try {
    //     const updatedThought = await Thought.findByIdAndUpdate(
    //         thoughtId,
    //         { thoughtText },
    //         { new: true }
    //     );
    //     if (updatedThought) {
    //         res.json(updatedThought);
    //     } else {
    //         res.status(404).json({
    //         message: 'Thought not found'
    //         });
    //     }
    //     } catch (err) {
    //     res.status(500).json(err);
    //     }
    // }
    try {
        const thoughtId = req.params.thoughtId;
    const updatedThought = await Thought.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(thoughtId) },
        { $set: req.body },
        { runValidators: true, new: true }
      );
  
      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
  
      return res.json(updatedThought);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };

    export const deleteThought = async (req: Request, res: Response) => {

        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      
            if (!thought) {
              return res.status(404).json({ message: 'No thought with that ID' });
            }
              return res.status(200).json({message:'Thought deleted successfully'});  
             } catch (err) {
            res.status(500).json(err);
            return;
          }
        }

        export const addReaction = async (req: Request, res: Response) => {
            try {
              const thoughtId = req.params.thoughtId;
              const reactionBody: IReaction = req.body;
              console.log(reactionBody);
              console.log(thoughtId);
              const updatedThought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                { $addToSet: { reactions: reactionBody } },
                { runValidators: true, new: true }
              );
              if (!updatedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
              }
              return res.json(updatedThought);
            } catch (error: any) {
              return res.status(400).json({
                message: error.message,
              });
            }
          };

          export const deleteReaction = async (req: Request, res: Response) => {
            try {
              const thoughtId = req.params.thoughtId;
              const reactionId = req.params.reactionId;
              const updatedThought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                { $pull: { reactions: { reactionId } } },
                { runValidators: true, new: true }
              );
              if (!updatedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
              }
              return res.json(updatedThought);
            } catch (error: any) {
              return res.status(400).json({
                message: error.message,
              });
            }
          };
