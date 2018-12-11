const utils = require('./utility.js');
let AbstractPrototype = require('./abstractPrototype.js');

class PeerReviewPrototype extends AbstractPrototype{
    constructor() {
        super();
        utils.abstractCheck(PeerReviewPrototype, new.target);
    }
}

module.exports = PeerReviewPrototype;