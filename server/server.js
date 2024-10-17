import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { dbConnection, upload } from './util/grid.js';  // Ensure this points to your GridFS setup file
import bookRoutes from './routes/bookRoutes.js';
import dotenv from 'dotenv';
const app = express();
const PORT = 5000;

dotenv.config();
// Middleware for CORS
app.use(cors());

// Connection to MongoDB
dbConnection();

// Middleware for JSON parsing
app.use(express.json());

// Use book routes
app.use('/api', bookRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});
