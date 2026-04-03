const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Books & Contacts API',
    description: 'API documentation for managing Books, Contacts, and GitHub OAuth',
  },
  host: process.env.HOST || 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {   
    Book: {
      type: 'object',
      required: ['title', 'author', 'genre', 'publishedYear', 'rating','publisher'],
      properties: {
        title: { type: 'string', example: 'To Kill a Mockingbird' },
        author: { type: 'string', example: 'Harper Lee' },
        genre: { type: 'string', example: 'Fiction' },
        publishedYear: { type: 'integer', example: 1960 },
        pages: { type: 'integer', example: 281 },
        rating: { type: 'number', format: 'float', example: 4.8 },
         publisher: { type: 'string', example: 'Penguin Books' }
      }
    },
    Contact: {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
      properties: {
        firstName: { type: 'string', example: 'John' },
        lastName: { type: 'string', example: 'Doe' },
        email: { type: 'string', example: 'john@example.com' },
        favoriteColor: { type: 'string', example: 'Blue' },
        birthday: { type: 'string', format: 'date', example: '1990-01-01' }
      }
    },
    AuthUser: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '123456' },
        username: { type: 'string', example: 'octocat' },
        displayName: { type: 'string', example: 'The Octocat' },
        emails: {
          type: 'array',
          items: { type: 'string', example: 'octocat@github.com' }
        }
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './routes/index.js',
  './routes/bookRoute.js',
  './routes/contactRoute.js',
  './routes/oAuth-Route.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});
