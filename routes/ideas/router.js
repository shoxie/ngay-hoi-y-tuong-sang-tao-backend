const express = require('express');
const { verificationMiddlewareFactory } = require('../../authentication/jwt.service');
const ideasController = require('./controller');
const {
	updateValidator,
	getByCategoryValidator
} = require('./validator');

const ideasRouter = express.Router();

// ideasRouter.post('/', createUserValidator, (req, res, next) => {
// 	ideasController.createUser(req, res, next); 
// });

// ideasRouter.post('/login', authenticateUserValidator, (req, res, next) => {
// 	ideasController.authenticateUser(req, res, next);
// });

// ideasRouter.get('/database/:table', (req, res, next) => {
// 	ideasController.readDatabaseTable(req, res, next); 
// });

// JWT protection for the endpoints below
const userJwtVerifier = verificationMiddlewareFactory('ADMIN');
ideasRouter.use(userJwtVerifier);

ideasRouter.get('/', (req, res, next) => {
	ideasController.readIdeas(req, res, next);
});

ideasRouter.get('/category', getByCategoryValidator, (req, res, next) => {
	ideasController.readIdeasByCategory(req, res, next);
})

ideasRouter.put('/', updateValidator, (req, res, next) => {
	ideasController.updateIdea(req, res, next); 
});

ideasRouter.delete('/:id', (req, res, next) => {
	ideasController.deleteIdea(req, res, next); 
});

// ideasRouter.patch('/:id', (req, res, next) => {
// 	ideasController.updateState(req, res, next);
// })

module.exports = ideasRouter;

