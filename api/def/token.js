const express = require('express');
const router = express.Router();

const tokenImpl = require('../impl/tokenImpl.js');
const apiUtility = require('../utility.js');
const errors = require('../errorMsg.js');

const UserDb = require('../../mock/mockedUser.js');

router.post('/', async function(req, res) {
    let b_email = req.body.email;
    let b_pwd = req.body.password;

    if (apiUtility.validateParamsUndefined(b_email, b_pwd))
        return res.status(400).json(errors.PARAMS_UNDEFINED);

    let userDb = new UserDb();
    try {
        let userId = await userDb.authenticate(b_email, b_pwd);
        let token = await tokenImpl.createToken(userId);
        return res.status(200).send(token);
    }
    catch (e) {
        return res.status(401).json(errors.INVALID_CREDENTIALS);
    }
});

module.exports = router;