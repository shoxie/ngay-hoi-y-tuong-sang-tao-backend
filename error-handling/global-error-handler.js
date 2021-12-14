function globalErrorHandler(error, req, res, next){
	console.error(error.joi.toString());
	res.status(500).json({
		success: false,
		data: null,
		error: error?.joi.toString() ?? error.message,
	});
}

module.exports = globalErrorHandler;