import { Schema, Types } from 'mongoose';

interface IReaction {
    reactionId: Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt?: Date;
  }

// Define the Reaction schema
const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(), // Default to a new ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280, // Set a maximum character limit for the string
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (val:Date) => val.toLocaleString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              }),
          },
    },
    {
        toJSON: {
            getters: true, // Enable getters for JSON output
        },
        id: false, // Prevent `id` virtual from being added
    }
);

export default reactionSchema;
export { IReaction,reactionSchema };
