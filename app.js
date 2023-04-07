import express from 'express';
import createHttpError from 'http-errors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/connectdb.js'

const app = express();
const port = process.env.PORT || 3000
const DATABASE_URL = process.env.DATABASE_URL



//morgan is used hwere to log the error that we are getting in console
app.use(morgan('dev'));

//TEmporarily checking that server is working
app.get('/',(req,res,next)=>{
    res.send('Working');
});

// Error Handler middleware function
// This middleware function is used to handle 404 errors, which occur when the requested URL does not match any of the routes defined in the application.
// It creates a NotFound error using the createHttpError library and passes it to the next middleware function using the next() method.
app.use((req, res, next) => {
    next(createHttpError.NotFound());
  });
  
  // Error Handler middleware function
  // This middleware function is used to handle all other errors that may occur in the application.
  // It takes the error object passed from the previous middleware function as the first argument, and the req and res objects as the second and third arguments, respectively.
  // It sets the status code of the error object to 500 (Internal Server Error) if it is not already set.
  // It sets the HTTP response status code to the same status code as the error object using the res.status() method.
  // Finally, it sends the error object back to the client using the res.send() method.
  app.use((error, req, res, next) => {
    error.status = error.status || 500;
    res.status(error.status);
    res.send(error);
  });
  
//Database Connection
connectDB(DATABASE_URL)

//Starting server
app.listen(port,()=>{
    console.log(`Server Listening at http://localhost:${port}`)
})