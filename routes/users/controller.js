const usersService = require('./service');

const usersController = {
	
	async createUser(req, res, next){
		const userInfo = {
			email: req.body.email,
			password: req.body.password,
			name: req.body.name,
		};
		let result = null;
		try {
			result = await usersService.createUser(userInfo);
		} catch (e) {
			next(e);
			return null; // Execution continues after the next() call finishes, so we have to 'return' here to avoid sending a response to clients twice
		}
		res.status(200).json(result);
	},

	async authenticateUser(req, res, next){
		const userCredentials = {
			email: req.body.email,
			password: req.body.password,
		};
		let jwt = null;
		try {
			jwt = await usersService.authenticateUser(userCredentials);
		} catch (e) {
			next(e);
			return null;
		}
		res.status(200).json(jwt);
	},

	async readUser(req, res, next){
		const userEmail = req.user.email;
		let userInfo = null;
		try {
			userInfo = await usersService.readUser(userEmail);
		} catch (e) {
			next(e);
			return null;
		}
		res.status(200).json(userInfo);
	},

	async updateUser(req, res, next){
		const userEmail = req.user.email;
		const newUserInfo = req.body;
		let result = null;
		try {
			result = await usersService.updateUser(userEmail, newUserInfo);
		} catch (e) {
			next(e);
			return null;
		}
		res.status(200).json(result);
	},

	async deleteUser(req, res, next){
		const UserEmail = req.user.email;
		let result = null;
		try {
			result = await usersService.deleteUser(UserEmail);
		} catch (e) {
			next(e);
			return null;
		}
		res.status(200).json(result);
	},

	// Development use only

	async readDatabaseTable(req, res, next){
		const table = req.params.table;
		const tableContents = await usersService.getDatabaseTable(table);
		// console.log('users table:', tableContents);
		res.status(200).json(tableContents);
	},
};

module.exports = usersController;