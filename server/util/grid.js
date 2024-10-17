import mongoose, { mongo } from "mongoose";
import multer from "multer";
import { GridFsStorage } from "@lenne.tech/multer-gridfs-storage";  // Ensure this is correctly installed
import dotenv from 'dotenv'

dotenv.config();
// const mongoURI = "mongodb://localhost:27017/library";
const mongoURI = process.env.DATABASE;

let gridBucket;


const dbConnection = () => {
    mongoose.connect(mongoURI)
    .then(()=>{
        console.log("MongoDb connected successfully");
        const db = mongoose.connection.db;
        gridBucket = new mongoose.mongo.GridFSBucket(db,{bucketName:"uploads"});
    }).catch(error => {
        console.error("MongoDb Connection error ", error);
        process.exit(1);
    })
}

// Create storage engine using @lenne.tech/multer-gridfs-storage
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return {
            filename: file.originalname,
            bucketName: "uploads",  // Ensure this matches the bucket name in your schema
        };
    },
});

// Initialize multer with the storage engine
const upload = multer({ storage });

// Export gridBucket and upload for use in other parts of the application
export { gridBucket, upload,dbConnection };




















































// import mongoose from "mongoose";
// import multer from "multer";
// import {GridFsStorage} from "@lenne.tech/multer-gridfs-storage";  // Ensure this is correctly installed


// const mongoURI = "mongodb://localhost:27017/library";


// const dbConnection = mongoose.createConnection(mongoURI);

// dbConnection.on('error', (err) => {
//     console.error('MongoDB connection error:', err);
// });


// let gridBucket;
// dbConnection.once('open',()=>{
//     gridBucket = new  mongoose.mongo.GridFSBucket(dbConnection.db,{bucketName:"uploads"});
    
// })


// // Create storage engine using @lenne.tech/multer-gridfs-storage
// const storage = new GridFsStorage({
//     url: mongoURI,
//     file: (req, file) => {
//         return {
//             filename: file.originalname,
//             bucketName: "uploads",  // Ensure this matches the bucket name in your schema
//         };
//     },
// });

// // Initialize multer with the storage engine
// const upload = multer({ storage });

// // Export gfs and upload for use in other parts of the application
// export { gridBucket, upload,dbConnection };




// Create a connection to MongoDB using createConnection
// export const dbConnection = mongoose.createConnection(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// dbConnection.once('open', () => {
//     gridBucket = new mongoose.mongo.GridFSBucket(dbConnection.db, { bucketName: "uploads" });
// });