let UserPrototype = require('../model/abstract/userPrototype.js');
const User = require('../model/user');
const user_data = require('./data/user_data');
const genericMockFunctions = require('./mockedEntity.js');
const errorMsg = require('./error');

//Intefaccia con DB (in questo caso mocked), inserire operazioni strettamente legate al DB
class MockedUser extends UserPrototype {

    constructor() {
        super();
        this.__ids__ = ['id'];
        
        let boundedInjector = genericMockFunctions.bind(this);
        boundedInjector(MockedUser, User, user_data);
    }

    getExams(user) {
        //...
    }

    getTasks(user, exam) {
        //...
    }

    authenticate(username, password) {
        return new Promise((resolve, reject) => {
            let userFound = user_data.find(u => u.username == username && u.password == password);

            if (userFound === undefined)
                reject(errorMsg.ENTITY_NOT_FOUND);
            else
                resolve(userFound.id);
        });
    }
}

module.exports = MockedUser;