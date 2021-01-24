const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.get('/', (req, res, next) => {
    try {
        const users = UserService.getUsers()        
        res.data = users;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try {
        const user = UserService.getUserById(req.params.id)
        res.data = user;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);


router.post('/', createUserValid, (req, res, next) => {
    try {
        if (res.validationPassed) {
            const userData = UserService.addUser(req.body)        
            res.data = userData;
        } 
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', updateUserValid, (req, res, next) => {
    try {
        if (res.validationPassed) {
            const userId = req.params.id;
            const newData = req.body;
            const user = UserService.updateUser(userId, newData)
            res.data = user;
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    try {
        const user = UserService.deleteUser(req.params.id)
        res.data = user;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);


module.exports = router;