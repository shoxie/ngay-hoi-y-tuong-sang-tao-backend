const express = require('express');
const adminsController = require('./controller');
const { verificationMiddlewareFactory } = require('../../authentication/jwt.service');

const adminsRouter = express.Router();

adminsRouter.post('/login', (req, res, next) => {
	adminsController.authenticateAdmin(req, res, next);
});

// JWT protection for the endpoints bellow
const adminJwtVerifier = verificationMiddlewareFactory('ADMIN');
adminsRouter.use(adminJwtVerifier);

adminsRouter.post('/', (req, res, next) => {
	adminsController.createAdmin(req, res, next);
});

adminsRouter.get('/:email', (req, res, next) => {
	adminsController.readAdmin(req, res, next);
});

adminsRouter.patch('/:email', (req, res, next) => {
	adminsController.updateAdmin(req, res, next);
});

adminsRouter.delete('/:email', (req, res, next) => {
	adminsController.deleteAdmin(req, res, next);
});

module.exports = adminsRouter;