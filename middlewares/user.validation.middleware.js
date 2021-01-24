const { user } = require('../models/user');
const createUserValid = (req, res, next) => {

    // TODO: Implement validatior for user entity during creation
    let validationPassed = true;

    try {
        if (req.body.hasOwnProperty('id')) throw Error('ID of the user already exists');

        const newUserData = {};        

        for (let key in user) {
            if (!req.body[key] && key != 'id') throw Error('Empty fields');
            if (key != 'id') newUserData[key] = req.body[key];
        }

        isEmailValid(newUserData);
        isPhoneValid(newUserData);
        isPasswordValid(newUserData);

    } catch (err) {
        res.err = err;
        validationPassed = false;
    } finally {
        res.validationPassed = validationPassed;
        next();
    }
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update

    let validationPassed = true;

    try {
        if (req.body.hasOwnProperty('id')) throw Error('Can not change ID of the user');

        const userData = req.body;
        
        for (let key in userData) {
            if (!user.hasOwnProperty(key)) throw Error('Unknown property');
            if (!userData[key]) throw Error('Property is empty');
            switch (key) {
                case 'email':
                    isEmailValid(userData);
                    break;
                case 'phoneNumber':
                    isPhoneValid(userData);
                    break;
                case 'password':
                    isPasswordValid(userData);
                    break;
            }
        }
    } catch (err) {
        res.err = err;
        validationPassed = false;
    } finally {
        res.validationPassed = validationPassed;
        next();
    }
}

const isEmailValid = (user) => {
    const isValid = user.email.match(/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/);
    if (!isValid) throw Error('Invalid email adress');
    return true;
}

const isPhoneValid = (user) => {
    const isValid = user.phoneNumber.startsWith('+380') && user.phoneNumber.length == 13;
    if (!isValid) throw Error('Incorrect phone');      
    return true;
}

const isPasswordValid = (user) => {
    const isValid = user.password.length > 2;
    if (!isValid) throw Error('Incorrect password');
    return true;
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;