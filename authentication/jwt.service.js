const jsonwebtoken = require('jsonwebtoken');
const { NotFound } = require('../error-handling/errors');


const jwtService = {
	
	sign(payload, userType){
		let secret = null;
		switch(userType){
			case 'USER':
				secret = process.env.JWT_USERS_SECRET || 'lmao1';
				break
			case 'ADMIN':
				secret = process.env.JWT_ADMINS_SECRET || 'lmao2';
				break;
			default:
				throw new NotFound('User type not found');
		}
		const options = {
			algorithm: 'HS256',
			expiresIn: '24h',
		};
		const jwt = jsonwebtoken.sign(payload, secret, options);
		return jwt;
	},

	// The functions bellow are Express middleware

	verificationMiddlewareFactory(userType){
		let secret = null;
		switch(userType){
			case 'USER':
				secret = process.env.JWT_USERS_SECRET || 'lmao1';
				break;
			case 'ADMIN':
				secret = process.env.JWT_ADMINS_SECRET || 'lmao2';
				break;
			default:
				throw new NotFound('User type not found');
		}
		const verificationMiddleware = function(req, res, next){
			const jwt = req?.headers?.authorization?.split(' ')[1]  ?? ""// 'Bearer token', we just need the token part
			// console.log(jwt);
			let userInfo = null;
			try {
				userInfo = jsonwebtoken.verify(jwt, secret);
				// userInfo = jsonwebtoken.verify(jwt, process.env.JWT_USERS_SECRET);
			} catch (e) {
				next(e);
				return null;
			}
			req.user = userInfo;
			// console.log('req.user: ', req.user);
			next();
		}
		return verificationMiddleware;
	},
};

module.exports = jwtService;