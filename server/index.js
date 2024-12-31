import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { connectDB } from './config/database.js';
import { initializeSocket } from './config/socket.js';
import { authRouter } from './routes/auth.js';
import { eventsRouter } from './routes/events.js';
import { resourcesRouter } from './routes/resources.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = initializeSocket(httpServer);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Make io available in req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/events', eventsRouter);
app.use('/api/resources', resourcesRouter);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});