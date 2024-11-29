import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { dbConnection, upload } from './util/grid.js';  // Ensure this points to your GridFS setup file
import bookRoutes from './routes/bookRoutes.js';
import dotenv from 'dotenv';
import Keycloak from 'keycloak-connect';
import session from 'express-session';

const app = express();
const PORT = 5000;

// Load environment variables
dotenv.config();

// Set up an in-memory session store (this can be replaced with a persistent store like Redis for production)
const memoryStore = new session.MemoryStore();

// Initialize Keycloak with the session store
const keycloak = new Keycloak({ store: memoryStore });

// Middleware for CORS
app.use(cors());

// MongoDB connection
dbConnection();

// Middleware to parse JSON
app.use(express.json());

// Session middleware
app.use(session({
  secret: 'your-session-secret',  // Change this to something secure and unique
  resave: false,
  saveUninitialized: true,
  store: memoryStore,  // Using in-memory session store
  }));

// Keycloak middleware for managing authentication sessions
app.use(keycloak.middleware());

// Use your book routes (secured by Keycloak)
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
