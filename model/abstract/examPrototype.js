const utils = require('./utility.js');
let AbstractPrototype = require('./abstractPrototype.js');

const modelErrors = require('./error.js');

class ExamPrototype extends AbstractPrototype {
    constructor() {
        super();
        utils.abstractCheck(ExamPrototype);
    }
}

module.exports = ExamPrototype;