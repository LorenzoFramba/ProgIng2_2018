const utils = require('./utility.js');
const modelErrors = require('./error.js');

class AbstractPrototype {
    constructor () {
        utils.abstractCheck(AbstractPrototype);
    }

    create(entity) {
        throw new InternalError(modelErrors.MISSING_OVERRIDE);
    }

    read(id) {
        throw new InternalError(modelErrors.MISSING_OVERRIDE);
    }

    update(entity) {
        throw new InternalError(modelErrors.MISSING_OVERRIDE);
    }

    delete(entity) {
        throw new InternalError(modelErrors.MISSING_OVERRIDE);
    }
}

module.exports = AbstractPrototype;