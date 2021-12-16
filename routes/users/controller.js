const usersService = require('./service');
const prisma = require('../../database/client');

const usersController = {

	async readUsers(req, res, next){
		var students = []
		let result = null;
		try {
			result = await prisma.user.findMany({
				include: {
					school: true,
					Idea: true
				}
			});
			result.map(student => {
				students.push({
					...student,
					isCompleted : student.Idea.filter((item) => item.idea?.[0]?.round_1 === "accepted").length === 5 ? true : false
				})
			})
		} catch (e) {
			next(e);
			return null;
		}
		res.status(200).json({ students });
	},
};

module.exports = usersController;