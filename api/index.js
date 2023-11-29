import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import monumentsRoute from './routes/monuments.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import bookingRoute from './routes/bookingorder.js';
import AdminRoute from './routes/admin.js';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: `${__dirname}/.env` });
}

const app = express();
app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT || 5000;

mongoose.set('strictQuery', true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    });
    console.log('Connected to db');
  } catch (error) {
    console.log('Not connected');
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Routes
app.use('/api/monuments', monumentsRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/bookingorder', bookingRoute);
app.use('/api/admin', AdminRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMsg = err.message || 'Something went wrong';

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMsg,
    stack: err.stack,
  });
});

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => {
    app.listen(port, () => {
      connect();
      console.log(`Listening to ${port}`);
    });
  });

// Serve static files (build of your frontend)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../my_app', 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../my_app', 'build', 'index.html'));
  });
}
