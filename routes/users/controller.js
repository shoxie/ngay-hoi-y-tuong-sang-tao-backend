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
				var newStudent = {...student}
				if (newStudent.schoolId === null) newStudent.school = {
					name: newStudent.otherSchool
				}
				students.push({
					...newStudent,
					isCompleted : student.Idea.filter((item) => item.round_1 === "accepted").length >= 5 ? true : false
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