const utils = require('./utility.js');
let AbstractPrototype = require('./abstractPrototype.js');

const modelErrors = require('./error.js');

class UserPrototype extends AbstractPrototype {
    constructor() {
        super();
        utils.abstractCheck(UserPrototype, new.target);
    }

    getExams(user) {
        throw new InternalError(modelErrors.MISSING_OVERRIDE);
    }

    getTasks(user, exam) {
        throw new InternalError(modelErrors.MISSING_OVERRIDE);
    }

    authenticate(username, password) {
        throw new InternalError(modelErrors.MISSING_OVERRIDE);
    }

    getUserByMail(mail){
        throw new InternalError(modelErrors.MISSING_OVERRIDE);
    }
}

module.exports = UserPrototype;