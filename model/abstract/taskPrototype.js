const utils = require('./utility.js');
let AbstractPrototype = require('./abstractPrototype.js');

class TaskPrototype extends AbstractPrototype {
    constructor() {
        super();
        utils.abstractCheck(TaskPrototype, new.target);
    }

    getTasksByExamId(examId) {
        throw new InternalError(modelErrors.MISSING_OVERRIDE);
    }
}

module.exports = TaskPrototype;