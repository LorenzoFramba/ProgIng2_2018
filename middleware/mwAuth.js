
let tokenImpl = require('../api/impl/tokenImpl.js');
const errors = require('../api/errorMsg.js');

//TODO: escludere richiesta POST user dalla verifica  
module.exports = async function(req, res, next) {
    try {
        let userId = await tokenImpl.verifyToken(req.token);
        req['uid'] = userId;
        next();
    }
    catch (e) {
        res.status(401).json(e);
    }
};