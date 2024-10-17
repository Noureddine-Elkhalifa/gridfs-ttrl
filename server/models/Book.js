import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        // required:true
    },
    author:{
        type:String,
        // required:true
    },
    genre:{
        type:String,
        // required:true
    },
    coverImages:[{
        type:mongoose.Schema.Types.ObjectId,
        // required:true,
        ref:'upload.files'
    }]
})

const Book = mongoose.model('Book', bookSchema);
export default Book;