const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const routes = require('./routes')
const { ValidationError } = require('sequelize');


const isProduction = environment === 'production';

const app = express();

// middleware used to log info about req and res in the server console
app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());


// ******* ERROR HANDLERS *******

// Catch unhandled requests and forward to error handler.
// will catch any requests that dont match our routes and
// return a 404 server error.


// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}
// helmet helps set a variety of headers to better secure your app
// disabled the CSP because React is generally safe at mitigating Cross-Site Scripting.
app.use(helmet({
    contentSecurityPolicy: false
  }));
  
  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true,
      },
    })
    );

  app.use(routes);
  
  app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
      err.title = "Resource Not Found";
      err.errors = ["The requested resource couldn't be found."];
      err.status = 404;
      // Remember, next invoked with nothing means that error handlers
      // defined after this middleware will not be invoked. However, 
      // next invoked with an error means that error handlers defined 
      // after this middleware will be invoked.
      next(err);
    });
    
    // Process sequelize errors
    app.use((err, _req, _res, next) => {
      // If the error that caused this error-handler to run 
      // is an instance of 'ValidationError' from the sequelize package, 
      // then the error was created from a Sequelize database validation 
      // error and the additional keys of title - string and errors array 
      // will be added to the error and passed into the next error 
      // handling middleware.
      if (err instanceof ValidationError) {
          err.errors = err.errors.map((e) => e.message);
          err.title = 'Sequelize Validation error';
      }
      next(err);
  });
  
  // The error formatter error handler is for formatting all 
  // the errors before returning a JSON response. It will 
  // include the error message, the errors array, and the error 
  // stack trace (if the environment is in development) with 
  // the status code of the error message.
  app.use((err, _req, res, _next) => {
      res.status(err.status || 500);
      console.error(err);
      res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
      });
  });
  
  module.exports = app;
  

  
  
  

  

  
















