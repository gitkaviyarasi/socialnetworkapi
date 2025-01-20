import {Schema,model,Document} from 'mongoose';
import { IReaction, reactionSchema } from './reaction.js';

interface Ithought extends Document{
    thoughtText:string,
    createdAt?:Date,
    username:string,
    reactions: IReaction[];
}

const thoughtSchema = new Schema<Ithought>(
    {
        thoughtText:{
            type:String,
            required:true,
            min:1,
            max:280,
        },
        createdAt:{
            type:Date,
            default:Date.now,
            get: (val:Date) => val.toLocaleString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              }),
        },
        username:{
            type:String,
            required:true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON:{
            virtuals:true,
            getters:true,
        },
        id: false,

    }
);
// virtual to get the reaction count.

thoughtSchema.virtual('reactionCount').get(function(this: Ithought){
    return this.reactions.length;
});

const Thought = model<Ithought>('Thought',thoughtSchema);

export default Thought;
