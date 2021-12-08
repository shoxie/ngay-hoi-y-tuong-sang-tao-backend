// Importing environment variables
require('dotenv').config();
console.log('environment: ', process.env.MODE);

// Importing modules
const express = require('express');
const app = express(); 
const path = require('path');

// Importing middleware
const helmet = require('helmet');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');

// Setting middleware (order matters)
app.use(helmet()); // Sets response headers securely
app.use(serveStatic(path.join(__dirname, 'public'))); // Static files serving
app.use(bodyParser.urlencoded({ extended: false })); // form urlencoded data
app.use(bodyParser.json()); // json data
// app.use(bodyParser.text()); // text data

// Routing 
app.get('/', (req, res, next) => { // home endpoint
	res.status(200).sendFile(path.join(__dirname, 'public/index.html')); // path is used for interoperability in different OSs	
});

const api = express.Router();
const usersRouter = require('./routes/users/router');
api.use('/users', usersRouter);
const adminsRouter = require('./routes/admins/router');
api.use('/admins', adminsRouter);

app.use('/api/v1', api);

// Setting global error handler
const globalErrorHandler = require('./error-handling/global-error-handler');
app.use(globalErrorHandler);

// Setting handler for endpoints that are not available (404 error handler)
const notFoundHandler = require('./error-handling/404-handler');
app.use(notFoundHandler);

// Starting the HTTP server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`HTTP server is listening on port ${PORT}!`);
});