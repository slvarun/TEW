if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: __dirname + '/.env' });
  }
  
  const express = require('express');
  const mongoose = require('mongoose');
  const cookieParser = require('cookie-parser');
  const monumentsRoute = require('./routes/monuments.js');
  const userRoute = require('./routes/users.js');
  const authRoute = require('./routes/auth.js');
  const bookingRoute = require('./routes/bookingorder.js');
  const AdminRoute = require('./routes/admin.js');
  const path = require('path');
  
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
        useCreateIndex: true,
        useFindAndModify: false,
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
    .connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      poolSize: 1,
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
  