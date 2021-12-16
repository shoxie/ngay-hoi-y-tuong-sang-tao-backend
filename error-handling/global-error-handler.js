function globalErrorHandler(error, req, res, next){
	console.log('error name', error.name)
	var errorMsg = error?.joi ? error.joi.toString() : error.message 
	var statusCode = error.name === "JsonWebTokenError" ? 401 : 500
	res.status(statusCode).json({
		success: false,
		data: null,
		error: errorMsg
	});
}

module.exports = globalErrorHandler;