const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Books & Contacts API',
    description: 'API for managing books and contacts collections'
  },
  host: process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:3000',
  schemes: process.env.RENDER_EXTERNAL_HOSTNAME ? ['https'] : ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/bookRoute.js', './routes/contactRoute.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(()=>{
    console.log('Swagger documentation created!')
});
