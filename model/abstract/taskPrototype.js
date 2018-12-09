const utils = require('./utility.js');
let AbstractPrototype = require('./abstractPrototype.js');

class TaskPrototype extends AbstractPrototype {
    constructor() {
        super();
        utils.abstractCheck(TaskPrototype);
    }
}

module.exports = TaskPrototype;