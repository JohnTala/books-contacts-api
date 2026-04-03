const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const swaggerRouter = require('./swagger'); // updated swagger.js
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const promiseAndUncaught_funct = require('./utils');

require('./config/passport-setup');
require('dotenv').config();

// Global error handlers: unhandled rejections & exceptions
promiseAndUncaught_funct();

const app = express();
const port = process.env.PORT || 3000;

// --------------------
// Middleware
// --------------------
app.use(express.json());

// CORS: allow frontend origin
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// Trust proxy for Render (HTTPS)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// --------------------
// Session & Passport
// --------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// --------------------
// Routes
// --------------------
app.use('/', require('./routes'));
app.use('/auth', require('./routes/oAuth-Route'));

// Swagger UI
app.use('/api-docs', swaggerRouter);

// Error handlers
app.use(notFound);
app.use(errorHandler);

// --------------------
// Connect to MongoDB & start server
// --------------------
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(port, () =>
      console.log(`Server running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`)
    )
  )
  .catch(err => console.error('MongoDB connection error:', err));
