const usersService = require('./service');
const prisma = require('../../database/client');

const usersController = {

	async readUsers(req, res, next){
		let result = null;
		try {
			result = await prisma.user.findMany({
				include: {
					school: true
				}
			});
		} catch (e) {
			next(e);
			return null;
		}
		res.status(200).json(result);
	},
};

module.exports = usersController;