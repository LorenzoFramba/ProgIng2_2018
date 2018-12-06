const utils = require('./utility.js');
let AbstractPrototype = require('./abstractPrototype.js');

class AnswerPrototype extends AbstractPrototype{
    constructor() {
        super();
        utils.abstractCheck(AnswerPrototype);
    }
}

module.exports = AnswerPrototype;