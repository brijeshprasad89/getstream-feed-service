/* Imports */
const express = require('express');

const bodyParser = require('body-parser');
const compression = require('compression');
const validator = require('express-validator');
const swagger = require('swagger-jsdoc');


const app = express();
const env = process.env.ENVIRONMENT || 'local';
const config = require('./config/' + env + '/config.json');
const port = process.env.PORT || config.port;



// Initialise the express components
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());
app.use(validator());

// Configure Swagger
const swaggerSpec = swagger({
    swaggerDefinition: {
        basePath: '/',
        info: {
            title: 'GetStream Post Service Documentation',
            version: '1.0',
            description: 'GetStream post Service is used by admins to post messages on feed'
        }
    },
    apis: [__dirname + '/routes/*.js'] // Path to the API routes
});

// Initialise the API routes
app.use('/feed', require('./routes/feed.routes'));
app.get('/ping', (req, res) => res.send('pong'));
app.get('/swagger.json', (req, res) => res.json(swaggerSpec));
app.use(express.static(__dirname + '/../public'));
app.use((req, res) => res.status(404).json({code: 404, message: 'HTTP 404 Not Found'}));


app.listen(port, () => {
    console.log('Using configuration ENVIRONMENT: ' + env);
    console.log('Server is running on PORT: ' + port);
});

app.close = function(){
    process.exit(0);
};
module.exports = app;
