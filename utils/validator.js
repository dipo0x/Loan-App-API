const validator = require('validator');

const inputValidator = {
  signup(name, username, email, password) {
    const errors = {};
    if (name === '') {
      errors['error'] = 'Name cannot be blank';
    }
    if (!validator.isLength(name, { min: 2, max: 30 })) {
      errors['error'] = 'Ensure that your name has a minimum of 2 characters and maximum of 30 characters';
    }
    if (username === '') {
      errors['error'] = 'Username cannot be blank';
    }
    if (!validator.isLength(username, { min: 2, max: 20 })) {
      errors['error'] = 'Ensure that your username has a minimum of 4 characters and maximum of 20 characters';
    }
    if (email === '') {
      errors['error'] = 'Email cannot be blank';
    }
    if (!validator.isEmail(email)) {
      errors['error'] = 'Not a valid email address';
    }
    if (password === '') {
      errors['error'] = 'Password cannot be blank';
    }
    if (!validator.isAscii(password)) {
      errors['error'] = 'Not a valid password';
    }
    if (!validator.isLength(password, { min: 4, max: 20 })) {
      errors['error'] = 'Ensure that your password has a minimum of 4 characters and maximum of 20 characters';
    }
    return {
      errors,
      valid: Object.keys(errors).length < 1,
    };
  },
  chargeCard(card_number, cvv, expiry_month, expiry_year, currency, pin) {
    const errors = {};
    if (card_number === '') {
      errors['error'] = 'Name cannot be blank';
    }
    if (!validator.isLength(card_number, { min: 16, max: 16 })) {
      errors['error'] = 'Ensure that your card number is 16 characters and is a number';
    }
    if (cvv === '') {
      errors['error'] = 'Cvv cannot be blank';
    }
    if (expiry_month === '') {
      errors['error'] = 'Expiry month cannot be blank';
    }
    if (expiry_year === '') {
      errors['error'] = 'Expiry year cannot be blank';
    }
    if (currency === '') {
      errors['error'] = 'Currency cannot be blank';
    }
    if (pin === '') {
      errors['error'] = 'Pin cannot be blank';
    }
    return {
      errors,
      valid: Object.keys(errors).length < 1,
    };
  },
};

module.exports = inputValidator;
