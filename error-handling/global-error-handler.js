function globalErrorHandler(error, req, res, next){
	var tokenErrors = ["TokenExpiredError", "JsonWebTokenError"]
	var errorMsg = error?.joi ? error.joi.toString() : error.message 
	var statusCode = tokenErrors.includes(error.name) ? 401 : 500
	res.status(statusCode).json({
		success: false,
		data: null,
		error: errorMsg
	});
}

module.exports = globalErrorHandler;