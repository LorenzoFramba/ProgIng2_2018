let tokenImpl = require('../api/impl/tokenImpl.js');
const errors = require('../api/errorMsg.js');

module.exports = function(req, res, next) {
    let userId = tokenImpl.verifyToken(req.token);

    // TODO: check on prototype
    if (!userId.code) {
        req['uid'] = userId;
        next();
    }
    else
        res.status(401).send(errors.INVALID_TOKEN);
};