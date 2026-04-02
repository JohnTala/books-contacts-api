const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const promiseAndUncaught_funct  = require('./utils')
const passport = require('passport');
const session = require('cookie-session');
require('./config/passport-setup');
require('dotenv').config();

//Handle global error handlers  : Unhandled Promise Rejections & Uncaught Exceptions
promiseAndUncaught_funct();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Mount all routes
app.use('/', require('./routes'));


// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// error handlers
app.use(notFound);
app.use(errorHandler);

// --------------------
// Configure cookie-based session
// --------------------
app.use(
  session({
    // Name of the cookie to store session data
    name: 'session',

    // Secret key(s) used to encrypt the session cookie
    // Uses SESSION_SECRET from environment variables or defaults to 'secretKey'
    keys: [process.env.SESSION_SECRET || 'secretKey'],

    // Maximum age of the cookie in milliseconds
    // Here, 24 hours (1 day)
    maxAge: 24 * 60 * 60 * 1000
  })
);

// --------------------
// Initialize Passport for authentication
// --------------------

// Initializes Passport so it can be used in the app
app.use(passport.initialize());

// Integrates Passport with the session
// Ensures user info is stored in the session and can persist across requests
app.use(passport.session());


// Mongoose connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
  .catch(err => console.error('MongoDB connection error:', err));
