const utils = require('./utility.js');
let AbstractPrototype = require('./abstractPrototype.js');

class AnswerPrototype extends AbstractPrototype{
    constructor() {
        super();
        utils.abstractCheck(AnswerPrototype, new.target);
    }
}

module.exports = AnswerPrototype;