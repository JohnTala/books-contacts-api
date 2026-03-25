const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Books & Contacts API',
    description: 'API documentation for managing Books and Contacts collections',
  },
  consumes: ['application/json'],
  produces: ['application/json'],
  components: {
    schemas: {
      Book: {
        type: 'object',
        properties: {
          title: { type: 'string', example: 'To Kill a Mockingbird' },
          author: { type: 'string', example: 'Harper Lee' },
          genre: { type: 'string', example: 'Fiction' },
          publishedYear: { type: 'integer', example: 1960 },
          pages: { type: 'integer', example: 281 },
          rating: { type: 'number', format: 'float', example: 4.8 }
        },
        required: ['title', 'author', 'genre', 'publishedYear', 'rating']
      },
      Contact: {
        type: 'object',
        properties: {
          firstName: { type: 'string', example: 'John' },
          lastName: { type: 'string', example: 'Doe' },
          email: { type: 'string', example: 'john@example.com' },
          favoriteColor: { type: 'string', example: 'Blue' },
          birthday: { type: 'string', format: 'date', example: '1990-01-01' }
        },
        required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday']
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/bookRoute.js', './routes/contactRoute.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});
