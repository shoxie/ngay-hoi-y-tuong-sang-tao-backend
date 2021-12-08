function globalErrorHandler(error, req, res, next){
	console.error(error);
	res.status(500).json({
		success: false,
		data: null,
		error: error.message,
	});
}

module.exports = globalErrorHandler;