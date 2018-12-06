let UserPrototype = require('../model/abstract/userPrototype.js');
const user_data = require('./data/user_data');
const genericMockFunctions = require('./mockedEntity.js');

class MockedUser extends UserPrototype {
    constructor() {
        super();
        genericMockFunctions(this.constructor, user_data);
    }

    getExams(user) {
        //...
    }

    getTasks(user, exam) {
        //...
    }

    authenticate(username, password) {
        let userFound = user_data.find(u => u.username == username && u.password == password);
        return userFound ? userFound.id : undefined;
    }
}

module.exports = MockedUser;