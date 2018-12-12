const utils = require('./utility.js');
let AbstractPrototype = require('./abstractPrototype.js');

const modelErrors = require('./error.js');

class ExamPrototype extends AbstractPrototype {
    constructor() {
        super();
        utils.abstractCheck(ExamPrototype, new.target);
    }

    getAllExams(userId) {
        throw new InternalError(modelErrors.MISSING_OVERRIDE);
    }

    getTasks(userId, examId) {
        throw new InternalError(modelErrors.MISSING_OVERRIDE);
    }
}

module.exports = ExamPrototype;