const db = require('../../database/db');
const jwtService = require('../../authentication/jwt.service');
const { 
	DatabaseError,
	NotFound
 } = require('../../error-handling/errors');

const usersService = {

	async createUser(userInfo){
		const tableRow = {
			email: userInfo.email,
			password: userInfo.password,
			name: userInfo.name,
			acc_status: 'PENDING',
			created_at: new Date(),
		};
		const result = await db('users').insert(tableRow);	
		if(!result) throw new DatabaseError('Could not create user');
		return { success: true };
	},

	async authenticateUser(userCredentials){
		const [ userInfo ] = await db('users').where(userCredentials);
		if(!userInfo) throw new NotFound('User not found');
		const jwt = jwtService.sign(userInfo, 'USER');
		return { jwt };
	},

	async readUser(userEmail){
		const [ userInfo ] = await db('users').where({ email: userEmail});
		if(!userInfo) throw new NotFound('User not found');
		return userInfo;
	},

	async updateUser(userEmail, newUserInfo){
		const result = await db('users')
			.where({ email: userEmail })
			.update(newUserInfo);

		if(!result) throw new DatabaseError('Could not update user');
		return { success: true };
	},

	async deleteUser(userEmail){
		const result = await db('users')
			.where({ email: userEmail })
			.delete();
		
		if(!result) throw new DatabaseError('Could not delete user');
		return { success: true };
	},

	// Development use only

	async getDatabaseTable(table){
		var tableContents;
		try {
			tableContents = await db(table);
		} catch (e) {
			console.error(e);
		}
		return tableContents;
	}
};

module.exports = usersService;
