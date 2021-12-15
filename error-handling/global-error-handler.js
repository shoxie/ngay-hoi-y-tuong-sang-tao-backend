function globalErrorHandler(error, req, res, next){
	var errorMsg = error?.joi ? error.joi.toString() : error.message 
	console.log(errorMsg)
	res.status(500).json({
		success: false,
		data: null,
		error: errorMsg
	});
}

module.exports = globalErrorHandler;