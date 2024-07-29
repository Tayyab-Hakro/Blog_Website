import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({

    title:{
        type:String,
  
    },
    description:{
        type:String,
   
    },
    file:{
        type:String,
    },
 
   
},);
export const CreatePost = mongoose.model("AllPost", PostSchema);