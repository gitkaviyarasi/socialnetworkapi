import {Schema,model,type Document} from 'mongoose';

interface Iuser extends Document{
    username:string,
    email:string,
    thoughts:Schema.Types.ObjectId[],
    friends:Schema.Types.ObjectId[],
}

const userSchema = new Schema<Iuser>(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
        },
        email:{
        type:String,
        required:true,
        unique:true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
        // match:[/.+@.+\..+/],   // need to check this  
        },
        thoughts:[
            {
                type:Schema.Types.ObjectId,
                ref:'Thought'
            },
        ],
        friends:[
            {
                type:Schema.Types.ObjectId,
                ref:'User'
            },
        ],
    },
    {
        toJSON:{
            virtuals:true,
        } ,
        id: false,
    }    
);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model<Iuser>('User',userSchema);

export default User;


