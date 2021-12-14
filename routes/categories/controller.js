const ideasService = require('./service');
const prisma = require('../../database/client');

const categoriesController = {
	async readCategories(req, res, next) {
		let result = null;
		try {
			result = await prisma.category.findMany()
		} catch (e) {
			next(e);
			return null; // Execution continues after the next() call finishes, so we have to 'return' here to avoid sending a response to clients twice
		}
		res.status(200).json(result);
	},
	async createCategory(req, res, next) {
		let result = null;
		try {
			result = await prisma.category.create({
				data: {
					name: req.body.name,
					slug: req.body.slug,
				}
			});
		} catch (e) {
			next(e);
			return null; // Execution continues after the next() call finishes, so we have to 'return' here to avoid sending a response to clients twice
		}
		res.status(200).json(result);
	},
	async updateCategory(req, res, next) {
		const categoryId = req.query.id;
		const newCategoryInfo = req.body;
		let result = null;
		try {
			result = await prisma.category.update({
				where: { id: categoryId },
				data: newCategoryInfo
			});
		} catch (e) {
			next(e);
			return null;
		}
		res.status(200).json(result);
	},
	async deleteCategory(req, res, next) {
		const categoryId = req.query.id;
		let result = null;
		try {
			result = await prisma.category.delete({
				where: { id: categoryId }
			});
		}
		catch (e) {
			next(e);
			return null;
		}
		res.status(200).json(result);
	}
};

module.exports = categoriesController;