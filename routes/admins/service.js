const db = require('../../database/db');
const jwtService = require('../../authentication/jwt.service');
const {
	DatabaseError,
	NotFound,
} = require('../../error-handling/errors');
const prisma = require('../../database/client');

const adminsService = {

	// async createAdmin(adminInfo){
	// 	const tableRow = {
	// 		email: adminInfo.email,
	// 		password: adminInfo.password,
	// 		name: adminInfo.name,
	// 		created_at: new Date(),
	// 	};
	// 	const result = await db('admins').insert(tableRow);
	// 	// console.log(result);
	// 	if(!result) throw new DatabaseError('Could not create admin');
	// 	return { success: true };
	// },

	async authenticateAdmin(adminCredentials) {
		// const [ adminInfo ] = await db('admins').where(adminCredentials);
		const adminInfo = await prisma.admin.findFirst({
			where: {
				username: adminCredentials.username,
				password: adminCredentials.password,
			},
		});
		if (!adminInfo) throw new NotFound('Could not find admin');
		const token = jwtService.sign(adminInfo, 'ADMIN');
		return { token };
	},

	async readAdmin(adminEmail) {
		const adminInfo = await prisma.admin.findFirst({ where: { username: adminEmail } })
		if (!adminInfo) throw new NotFound('Could not find admin');
		return adminInfo;
	},



};

module.exports = adminsService;