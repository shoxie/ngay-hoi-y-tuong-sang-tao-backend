const { celebrate, Joi } = require('celebrate');

const loginValidator = celebrate({
    body: Joi.object().keys({
        username: Joi.string().required().error(new Error('Username is required')),
        password: Joi.string().required().error(new Error('Password is required')),
    })
})

module.exports = {
	loginValidator
};