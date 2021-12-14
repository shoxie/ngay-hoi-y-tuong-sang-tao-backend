const { celebrate, Joi } = require('celebrate');

const updateValidator = celebrate({
	body: Joi.object().keys({
		id: Joi.disallow().error(new Error('id is not allowed')),
	})
})

const getByCategoryValidator = celebrate({
	query: Joi.object().keys({
		id: Joi.required().error(new Error('Category [id] is required'))
	})
})

module.exports = {
	updateValidator,
	getByCategoryValidator
};