const { celebrate, Joi } = require('celebrate');

const createUserValidator = celebrate({
  body: Joi.object().keys({ // The req.body object must be populated prior to the validation
		email: Joi.string()
			.email({ minDomainSegments: 2 })
			.max(64)
			.required(),
		password: Joi.string()
			// .alphanum()
			.min(8)
			.max(64)	
			.required(),
		name: Joi.string()
			// .alphanum()
			.max(64)	
			.required(),
	})
});

const authenticateUserValidator = celebrate({
  body: Joi.object().keys({
		email: Joi.string()
			.email({ minDomainSegments: 2 })
			.max(64)
			.required(),
		password: Joi.string()
			.min(8)
			.max(64)	
			.required(),
	})
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
		email: Joi.string().forbidden(), // User should not be able to update his email, as emails are IDs 
		password: Joi.string()
			.min(8)
			.max(64),
		name: Joi.string()
			.max(64),
		acc_status: Joi.string().forbidden(),
		created_at: Joi.string().forbidden(),
		// status: Joi.string().valid(['ACTIVE', 'INACTIVE'])
	})
});


// All of these are middleware (a.k.a. functions)
module.exports = {
	createUserValidator,
	authenticateUserValidator,
	updateUserValidator,
};