import Book from '../Models/Book.js';
import { gridBucket } from '../util/grid.js';
import mongoose, { Types } from 'mongoose';
import { dbConnection } from '../util/grid.js';
import { ObjectId } from 'mongodb';

export const addBook = async (req, res) => {
    const { title, author, genre } = req.body;
    
    // Check if a file was uploaded
    if (!req.files) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Access the file ID correctly
    const coverImages = req.files.map(file => file.id); 
    console.log(coverImages);

    // Create a new book instance
    const newBook = new Book({
        title,
        author,
        genre,
        coverImages
    });

    // Save the new book
    try {
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add book', details: err });
    }
};

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
};


export const getBookCover = async (req,res) => {

        let fileId;    

        // Convert id into ObjectId readable by mongodb
        try{
             fileId = new ObjectId(req.params.fileId); 
        }
        catch(error){
            console.error("invalid file ID format ", error);
        }

        try{
            const cover = await gridBucket.find({_id:fileId}).toArray();
            if(!cover || cover.length === 0){
                return res.status(404).send({message:'Cover not found'});
            }

            const downloadStream = gridBucket.openDownloadStream(fileId);
            res.setHeader('Content-Type', cover[0].contentType);
 
            downloadStream.pipe(res); 

            downloadStream.on('error', (error) => {
                console.error('Error streaming image:', error);
                res.status(500).send({ message: 'Error streaming file' });
            });
    
            downloadStream.on('end', () => {
                console.log('File streaming completed successfully.');
            });
    
        }
        catch(error){
            console.error('Error fetching cover:', error);
            res.status(500).send({ message: 'Error fetching cover' });
        }
}

export const getBookByID = async(req,res) =>{
    

    try{
        const bookId =  req.params.bookId;
        const book = await Book.findById(bookId)

        if(!book) return res.status(500).send({message:"No book was found with given ID"});
        
        return res.status(200).json(book);

    }
    catch(error)
    {
        console.error(error)
    }
}

export const editBook = async (req,res) => {
    const {title,author,genre} = req.body;
    const booksId = req.params.id;
 
    //extracting the id of all the covers
    const NewCoverImages = req.files.map(file => file.id); 
   
    const currBook = await Book.findById(booksId);
   console.log("NEW FILES",NewCoverImages);



        try {

            const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
                            title,
                            author,
                            genre,
                            coverImages: NewCoverImages.length === 0? currBook.coverImages: [...currBook.coverImages,...NewCoverImages]
                        },{new:true})
            
                        res.status(200).json(updatedBook);
            console.log(NewCoverImages)
        } catch (error) {
                console.error(error)
                res.status(500).send({message:"Error updating the book"})
        }
}

export const deleteCover = async (req,res) => {
    const coverId = new ObjectId(req.body.cover);
    const bookId = req.body.book;
    console.log(coverId);
    try {

        //Delete the file
        await gridBucket.delete(coverId);

        //Remove file id from the document
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            {$pull:{coverImages:coverId}},
            {new:true}
        );

        console.log("Updated book: ",updatedBook);
        res.status(200).json(updatedBook);
        
    } catch (error) {
        console.log(error)
    }
}

export const deleteBook = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const bookId = new ObjectId(req.params.bookId);
        const book = await Book.findById(bookId).session(session);

        if (!book) throw new Error("Book not found");

        // Deleting the book document
        try {
           
            for (const cover of book.coverImages)
                {
                    await gridBucket.delete(cover);
                    console.log("Book cover id",cover)
                }
            console.log("Cover is deleted");
        } catch (error) {
            console.log("Error while deleting covers",error)
        }
       
        console.log("Book is deleted");

        const deletedREsult = await Book.findByIdAndDelete(bookId);
        console.log(deletedREsult);
        
        
         res.status(200).send({ message: 'Book deleted successfully' });

    } catch (error) {
        res.status(500).send({ error: 'Failed to delete book' });

}
}
