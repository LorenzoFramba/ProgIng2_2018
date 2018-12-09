const express = require('express');
const router = express.Router();

const answer_model = require('../../model/answer.js');
const apiUtility = require('../utility.js');
const errors = require('../errorMsg.js');
const answerImpl = require('../impl/answerImpl');
let AnswerDb = require('../../mock/mockedAnswer');

router.get('/', async function(req, res, next) {
    let q_userid = parseInt(req.query.user);
    let q_taskid = parseInt(req.query.task);
    let q_examid = parseInt(req.query.exam);
    let userId = req.uid;

    if (apiUtility.validateParamsUndefined(q_userid, q_taskid, q_examid))
        res.status(400).json(errors.PARAMS_UNDEFINED);

    if (!apiUtility.validateParamsNumber(q_userid, q_taskid, q_examid))
        res.status(400).json(errors.PARAMS_WRONG_TYPE);

    try {
        if (!(await answerImpl.checkUserAccessOnExam(q_userid, userId, q_examid)))
            res.status(400).json(errors.ACCESS_NOT_GRANTED);
        //dentro answer chiama getanwere, e gli passa userid, examid e taskid.
        let answer = await answerImpl.getAnswer(q_userid, q_examid, q_taskid);
        if (answer === undefined)
            res.status(404).send(errors.ENTITY_NOT_FOUND);
        else
            res.status(200).json(answer);
    }
    catch (err) {
        next(err);
    }
});

router.post('/', async function(req, res, next) {
    let q_taskid = parseInt(req.query.task);
    let q_examid = parseInt(req.query.exam);
    let b_value = req.body.value;
    let userId = req.uid;

    if (apiUtility.validateParamsUndefined(q_taskid, q_examid))
        res.status(400).json(errors.PARAMS_UNDEFINED);

    if (!apiUtility.validateParamsNumber(q_taskid, q_examid))
        res.status(400).json(errors.PARAMS_WRONG_TYPE);

    try {
        await answerImpl.addAnswer(userId, q_taskid, q_examid, b_value);
        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
});

router.put('/', async function(req, res, next) { // next passa al middleware l'errore. se trovo un errore, vengono beccati dal catch, passati tramite il next al middleware
    let q_taskid = parseInt(req.query.task);
    let q_examid = parseInt(req.query.exam);
    let b_value = req.body.value;
    let userId = req.uid;

    if (apiUtility.validateParamsUndefined(q_taskid, q_examid))
        res.status(400).json(errors.PARAMS_UNDEFINED);

    if (!apiUtility.validateParamsNumber(q_taskid, q_examid))
        res.status(400).json(errors.PARAMS_WRONG_TYPE);

    try {  //await, aspetto che l'ultimo thread sia finito. 
        await answerImpl.updateAnswer(userId, q_taskid, q_examid, b_value);
        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
});

router.delete('/', async function(req, res, next) {
    let q_taskid = parseInt(req.query.task);
    let q_examid = parseInt(req.query.exam);
    let userId = req.uid;

    if (apiUtility.validateParamsUndefined(userId, q_taskid, q_examid))
        res.status(400).json(errors.PARAMS_UNDEFINED);

    if (!apiUtility.validateParamsNumber(q_taskid, q_examid))
        res.status(400).json(errors.PARAMS_WRONG_TYPE);

    try {
        await answerImpl.deleteAnswer(userId, q_taskid, q_examid);
        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;