const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const promiseAndUncaught_funct = require('./utils');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

require('./config/passport-setup');
require('dotenv').config();

// Handle global error handlers: Unhandled Promise Rejections & Uncaught Exceptions
promiseAndUncaught_funct();

const app = express();
const port = process.env.PORT || 3000;

// --------------------
// Middleware
// --------------------
app.use(express.json());

// CORS: allow localhost and Render frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000', // frontend URL
    credentials: true,
  })
);

// --------------------
// Configure express-session for Passport
// --------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === 'production', // HTTPS on Render
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// --------------------
// Routes
// --------------------
app.use('/', require('./routes'));
app.use('/auth', require('./routes/oAuth-Route'));



// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handlers
app.use(notFound);
app.use(errorHandler);

// --------------------
// Connect to MongoDB and start server
// --------------------
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
  .catch(err => console.error('MongoDB connection error:', err));
