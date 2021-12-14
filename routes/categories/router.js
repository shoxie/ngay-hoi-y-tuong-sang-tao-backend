const express = require('express');
const { verificationMiddlewareFactory } = require('../../authentication/jwt.service');
const categoriesController = require('./controller');
const {
	createValidator,
	updateValidator
} = require('./validator');

const categoriesRouter = express.Router();

// JWT protection for the endpoints below
const userJwtVerifier = verificationMiddlewareFactory('ADMIN');
categoriesRouter.use(userJwtVerifier);

categoriesRouter.get('/', (req, res, next) => {
	categoriesController.readCategories(req, res, next);
});

categoriesRouter.post('/', createValidator, (req, res, next) => {
	categoriesController.createCategory(req, res, next);
});

categoriesRouter.put('/:id', updateValidator, (req, res, next) => {
	categoriesController.updateCategory(req, res, next)
})

categoriesRouter.delete('/:id', (req, res, next) => {
	categoriesController.deleteCategory(req, res, next);
});

// ideasRouter.patch('/:id', (req, res, next) => {
// 	ideasController.updateState(req, res, next);
// })

module.exports = categoriesRouter;

