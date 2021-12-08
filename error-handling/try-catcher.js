async function tryCatcher(f, arg, nextMiddleware){
	let result = null;
	try {
		result = await f(arg);
	} catch (e) {
		nextMiddleware(e);
		return null;
	}
	return result;
}

module.exports = tryCatcher;

/** Conclusions:
 *  - Tested it in the 'admins' domain
 *  - Not really worth it, saves up a few lines of code in exchange for readability.
 *  - Readability is too important to be traded without good reason 
 */


