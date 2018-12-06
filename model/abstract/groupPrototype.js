const utils = require('./utility.js');
let AbstractPrototype = require('./abstractPrototype.js');

const modelErrors = require('./error.js');

class GroupPrototype extends AbstractPrototype{
    constructor() {
        super();
        utils.abstractCheck(GroupPrototype);
    }

    getUsers(group) {
        throw new InternalError(modelErrors.MISSING_OVERRIDE);
    }
}

module.exports = AnswerPrototype;