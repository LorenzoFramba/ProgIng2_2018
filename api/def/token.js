const express = require('express');
const router = express.Router();

const tokenImpl = require('../impl/tokenImpl.js');
const apiUtility = require('../utility.js');
const errors = require('../errorMsg.js');

const UserDb = require('../../mock/mockedUser.js');

router.post('/', function(req, res) {
    let b_username = req.body.username;
    let b_pwd = req.body.password;

    if (apiUtility.checkParamsUndefined(b_username, b_pwd))
        res.status(400).json(errors.PARAMS_UNDEFINED);

    let userDb = new UserDb();
    let userId = userDb.authenticate(b_username, b_pwd);

    if (!userId)
        res.status(401).json(errors.INVALID_CREDENTIALS);
    else
    {
        let token = tokenImpl.createToken(userId);
        res.status(200).send(token);
    }
});

module.exports = router;