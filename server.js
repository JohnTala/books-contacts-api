const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Mount all routes
app.use('/', require('./routes'));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 404 & error handler
app.use(notFound);
app.use(errorHandler);

// Mongoose connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
  .catch(err => console.error('MongoDB connection error:', err));
