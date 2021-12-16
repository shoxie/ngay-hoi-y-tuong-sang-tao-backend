const { celebrate, Joi } = require('celebrate');

const updateValidator = celebrate({
	body: Joi.object().keys({
		// id: Joi.forbidden().error(new Error('id is not allowed')),
	})
})

const getByCategoryValidator = celebrate({
	query: Joi.object().keys({
		slug: Joi.required().error(new Error('Category [slug] is required'))
	})
})

module.exports = {
	updateValidator,
	getByCategoryValidator
};