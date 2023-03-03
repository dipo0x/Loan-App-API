const validator = require('validator')

module.exports.signup = (username, email, password) => {
	const errors = {};
    if (username === ''){
		errors["error"] = "Username cannot be blank";
	}
    if(!validator.isLength(username, { min:2, max: 20 })){
		errors["error"] = "Ensure that your username has a minimum of 4 characters and maximum of 20 characters";	
	}
	if (email === ''){
		errors["error"] = "Email cannot be blank";
	}
	if (!validator.isEmail(email)){
		errors["error"] = "Not a valid email address";
		}
	if(password === ''){
		errors["error"] = "Password cannot be blank"
	}
	if(!validator.isAscii(password)){
		errors["error"] = "Not a valid password";	
		}
	if(!validator.isLength(password, { min:4, max: 20 })){
		errors["error"] = "Ensure that your password has a minimum of 4 characters and maximum of 20 characters";	
	}
    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}