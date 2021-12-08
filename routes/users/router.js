const express = require('express');
const { verificationMiddlewareFactory } = require('../../authentication/jwt.service');
const usersController = require('./controller');
const {
	createUserValidator,
	authenticateUserValidator,
	updateUserValidator,

} = require('./validator');

const usersRouter = express.Router();

usersRouter.post('/', createUserValidator, (req, res, next) => {
	usersController.createUser(req, res, next); 
});

usersRouter.post('/login', authenticateUserValidator, (req, res, next) => {
	usersController.authenticateUser(req, res, next);
});

usersRouter.get('/database/:table', (req, res, next) => {
	usersController.readDatabaseTable(req, res, next); 
});

// JWT protection for the endpoints below
const userJwtVerifier = verificationMiddlewareFactory('USER');
usersRouter.use(userJwtVerifier);

usersRouter.get('/', (req, res, next) => {
	usersController.readUser(req, res, next); 
});

usersRouter.patch('/', updateUserValidator, (req, res, next) => {
	usersController.updateUser(req, res, next); 
});

usersRouter.delete('/', (req, res, next) => {
	usersController.deleteUser(req, res, next); 
});

module.exports = usersRouter;

