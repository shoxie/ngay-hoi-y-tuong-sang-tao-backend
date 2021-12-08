const adminsService = require('./service');
const tryCatcher = require('../../error-handling/try-catcher');

const adminsController = {

	async createAdmin(req, res, next){
		const adminInfo = {
			email: req.body.email,
			password: req.body.password,
			name: req.body.name,
		};
		const result = await tryCatcher(adminsService.createAdmin, adminInfo, next); // Testing the tryCatcher()
		if(result) res.status(200).json(result); // Should only send a response when the global error handler did not
	},

	async authenticateAdmin(req, res, next){
		const adminCredentials = {
			email: req.body.email,
			password: req.body.password,
		};
		const result = await tryCatcher(adminsService.authenticateAdmin, adminCredentials, next);
		if(result) res.status(200).json(result);
	},

	async readAdmin(req, res, next){
		const adminEmail = req.params.email;
		let result = await tryCatcher(adminsService.readAdmin, adminEmail, next);
		if(result) res.status(200).json(result);
	},

	async updateAdmin(req, res, next){
		const adminEmail = req.params.email;
		const newAdminInfo = req.body;
		// AKIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIi
	},

	async deleteAdmin(){

	},

};

module.exports = adminsController;

