const express = require('express');
const router = express.Router();

const answer_model = require('../../model/answer.js');
const answerImpl = require('../impl/answerImpl.js');
const apiUtility = require('../utility.js');
const errors = require('../errorMsg.js');

router.get('/', function(req, res) {
    let q_userid = req.query.user;
    let q_taskid = req.query.task;
    let q_examid = req.query.exam;
    let uid = req.body.uid;

    if (apiUtility.checkParamsUndefined(q_userid, q_taskid, q_examid))
        res.status(400).json(errors.PARAMS_UNDEFINED);
});

router.post('/', function(req, res) {
    let q_userid = req.query.user;
    let q_taskid = req.query.task;
    let q_examid = req.query.exam;

    
});

module.exports = router;