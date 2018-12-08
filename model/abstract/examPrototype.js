const utils = require('./utility.js');
let AbstractPrototype = require('./abstractPrototype.js');

const modelErrors = require('./error.js');

class ExamPrototype extends AbstractPrototype {
    constructor() {
        super();
        utils.abstractCheck(ExamPrototype);
    }

    getTasks(exam) {
        throw new InternalError(modelErrors.MISSING_OVERRIDE);
    }
}

module.exports = ExamPrototype;