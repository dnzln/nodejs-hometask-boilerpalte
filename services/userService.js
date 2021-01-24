const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user

    deleteUser(id) {
        const user = UserRepository.delete(id);        
        if(!user) {
            throw Error('404 User not found');
        }
        return user;
    }

    updateUser(id, newData) {
        const user = UserRepository.update(id, newData);        
        if(!user) {
            throw Error('404 User not found');
        }
        return user;
    }

    getUserById(id) {
        const user = UserRepository.getOne({ 'id': id });        
        if(!user) {
            throw Error('404 User not found');
        }
        return user;
    }

    getUsers() {
        const users = UserRepository.getAll();        
        if(!users) {
            return null;
        }
        return users;
    }

    addUser(userData) {
        const user = UserRepository.create(userData);        
        if(!user) {
            throw Error('User not created');
        }
        return user;
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new UserService();