const express = require('express');
const { verificationMiddlewareFactory } = require('../../authentication/jwt.service');
const usersController = require('./controller');
const {
	createUserValidator,
	authenticateUserValidator,
	updateUserValidator,

} = require('./validator');

const usersRouter = express.Router();

usersRouter.get('/', (req, res, next) => {
	usersController.readUsers(req, res, next)
})

// JWT protection for the endpoints below
const userJwtVerifier = verificationMiddlewareFactory('USER');
usersRouter.use(userJwtVerifier);

module.exports = usersRouter;

