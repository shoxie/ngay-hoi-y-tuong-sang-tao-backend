class BadRequest extends Error {
	static get statusCode(){
		return 400;
	}
}

class Unauthorized extends Error {
	static get statusCode(){
		return 401;
	}
}
	
class Forbidden extends Error {
	static get statusCode(){
		return 403;
	}
}
	
class NotFound extends Error {
	static get statusCode(){
		return 404;
	}
}

class DatabaseError extends Error {
	static get statusCode(){
		return 500;
	}
}

// console.log(errors.badRequest.statusCode);

module.exports = {
	BadRequest,
	Unauthorized,
	Forbidden,
	NotFound,
	DatabaseError,
}