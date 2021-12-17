const ideasService = require('./service');
const prisma = require('../../database/client');

const ideasController = {

	async createUser(req, res, next) {
		const userInfo = {
			email: req.body.email,
			password: req.body.password,
			name: req.body.name,
		};
		let result = null;
		try {
			result = await ideasService.createUser(userInfo);
		} catch (e) {
			next(e);
			return null; // Execution continues after the next() call finishes, so we have to 'return' here to avoid sending a response to clients twice
		}
		res.status(200).json(result);
	},

	async authenticateUser(req, res, next) {
		const userCredentials = {
			email: req.body.email,
			password: req.body.password,
		};
		let jwt = null;
		try {
			jwt = await ideasService.authenticateUser(userCredentials);
		} catch (e) {
			next(e);
			return null;
		}
		res.status(200).json(jwt);
	},

	async readIdeas(req, res, next) {
		let data = null;
		let total = null
		try {
			const skip = parseInt(req.query._skip) || undefined;
			const take = parseInt(req.query._take) || undefined;
			const order = req.query._order || undefined;
			const sort = req?.query?._sort?.toLowerCase() || undefined;
			const ids = req.query?.ids && JSON.parse(req.query.ids);
			const filter = req.query?.filter && JSON.parse(req.query.filter);
			data = await prisma.idea.findMany({
				skip,
				take,
				where: { id: ids ? { in: ids } : undefined, ...filter },
				orderBy: order ? { [order]: sort } : undefined,
				include: {
					Category: true,
					student: {
						include: {
							school: true
						}
					}
				}
			});
			data.map(idea => {
				var newIdea = {...idea}
				if(idea.student.schoolId === null) {
					newIdea.student.school = {
						name: newIdea.student.otherSchool
					}
				}
				return newIdea
			})
			total = await prisma.idea.count({
				where: { id: ids ? { in: ids } : undefined, ...filter },
			});
		
		} catch (e) {
			next(e);
			return null;
		}
		res.status(200).json({ data, total });
	},

	async updateIdea(req, res, next) {
		const id = parseInt(req.query.id)

		let result = null;
		try {
			result = await prisma.idea.update({
				where: { id },
				data: req.body,
				include: {
					Category: {
						select : {
							slug: true
						}
					},
					student: {
						select: {
							name: true
						}
					}
				}
			})
		} catch (e) {
			next(e);
			return null;
		}
		res.status(200).json(result);
	},

	async deleteIdea(req, res, next) {
		const id = parseInt(req.params.id)
		let result = null;
		try {
			result = await prisma.idea.delete({
				where: { id },
			})
		} catch (e) {
			next(e);
			return null;
		}
		res.status(200).json(result);
	},

	async readDatabaseTable(req, res, next) {
		const table = req.params.table;
		const tableContents = await ideasService.getDatabaseTable(table);
		// console.log('users table:', tableContents);
		res.status(200).json(tableContents);
	},

	async readIdeasByCategory(req, res, next) {
		let result = null;
		var total = null
		var filter = req.query.filter ? JSON.parse(req.query.filter) : undefined 
		const skip = parseInt(req.query._skip) || undefined;
		const take = parseInt(req.query._take) || undefined;
		try {
			result = await prisma.idea.findMany({
				skip,
				take,
				include: {
					Category: {
						select: {
							slug: true
						}
					},
					student: {
						select: {
							name: true
						}
					}
				},
				where: {
					Category: {
						slug: req.query.slug
					},
					...filter
				},
			})
			total = await prisma.idea.count({
				where: {
					Category: {
						slug: req.query.slug
					},
					...filter
				},
			})
		} catch (e) {
			next(e);
			return null;
		}
		res.status(200).json({
			result,
			total
		});
	},

	async countByStatus(req, res, next) {
		var { round } = req.query
		var obj = {}
		var result = null
		try {
		result = await prisma.idea.findMany({
				where : {
					Category: {
						slug: req.query.slug
					}
				}
			})
		switch(round) {
			case '1' : 
				obj.rejected = result.filter(item => item.round_1 === "rejected").length
				obj.accepted = result.filter(item => item.round_1 === "accepted").length
				obj.pending = result.filter(item => item.round_1 === "pending").length
				break;
			case '2' : 
				obj.rejected = result.filter(item => item.round_2 === "rejected").length
				obj.accepted = result.filter(item => item.round_2 === "accepted").length
				obj.pending = result.filter(item => item.round_2 === "pending").length
				break;
			case '3' : 
				obj.rejected = result.filter(item => item.round_3 === "rejected").length
				obj.accepted = result.filter(item => item.round_3 === "accepted").length
				obj.pending = result.filter(item => item.round_3 === "pending").length
				break;
			default :
				break

		}
		}catch(e) {
			next(e);
			return null
		}
		res.status(200).json(obj)
	}
	
	// async updateState(req, res, next) {
	// 	let result = null;
	// 	try {
	// 		result = await prisma.idea.update({
	// 			where: { id: req.params.id },
	// 			data: { state: req.body.status }
	// 		})
	// 	} catch (e) {
	// 		next(e);
	// 		return null;
	// 	}
	// 	res.status(200).json(result);
	// }
};

module.exports = ideasController;