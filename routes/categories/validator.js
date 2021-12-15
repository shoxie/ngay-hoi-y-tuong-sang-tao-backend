const { celebrate, Joi } = require('celebrate');

const createValidator = celebrate({
	body: Joi.object().keys({
		slug: Joi.string().required().error(new Error('Slug is required')),
		name: Joi.string().required().error(new Error('Name is required')),
	})
})

const updateValidator = celebrate({
	body: Joi.object().keys({
		id: Joi.forbidden().error(new Error('id is not allowed')),
	})
})
// All of these are middleware (a.k.a. functions)
module.exports = {
	createValidator,
	updateValidator
};