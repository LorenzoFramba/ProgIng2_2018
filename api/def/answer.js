const express = require('express');
const router = express.Router();

const apiUtility = require('../utility.js');
const errors = require('../errorMsg.js');
const answerImpl = require('../impl/answerImpl');

router.get('/', async function(req, res, next) {
    if (apiUtility.validateParamsUndefined(req.query.user, req.query.task, req.query.exam))
        return res.status(400).json(errors.PARAMS_UNDEFINED);

    let q_userid = apiUtility.castToInt(req.query.user);
    let q_taskid = apiUtility.castToInt(req.query.task);
    let q_examid = apiUtility.castToInt(req.query.exam);
    let userId = req.uid;

    if (!apiUtility.validateParamsNumber(q_userid, q_taskid, q_examid))
        return res.status(400).json(errors.PARAMS_WRONG_TYPE);

    try {
        if (!(await apiUtility.checkUserAccessOnExam(q_userid, userId, q_examid)))
            return res.status(401).json(errors.ACCESS_NOT_GRANTED);

        let answer = await answerImpl.getAnswer(q_userid, q_examid, q_taskid);
        if (answer === undefined)
            return res.status(404).send(errors.ENTITY_NOT_FOUND);
        else
            return res.status(200).json(answer);
    }
    catch (err) {
        return next(err);
    }
});

router.post('/', async function(req, res, next) {
    if (apiUtility.validateParamsUndefined(req.query.task, req.query.exam))
        return res.status(400).json(errors.PARAMS_UNDEFINED);

    let q_taskid = apiUtility.castToInt(req.query.task);
    let q_examid = apiUtility.castToInt(req.query.exam);
    let b_value = req.body.value;
    let userId = req.uid;

    if (!apiUtility.validateParamsNumber(q_taskid, q_examid))
        return res.status(400).json(errors.PARAMS_WRONG_TYPE);

    try {
        if (!(await answerImpl.checkAnswerReferTask(userId, q_examid, q_taskid)))
            return res.status(404).json(errors.ENTITY_NOT_FOUND);

        await answerImpl.addAnswer(userId, q_taskid, q_examid, b_value);
        return res.status(204).end();
    }
    catch (err) {
        if (err.code === 'M0003')
            return res.status(400).json(err);
        else
            return next(err);
    }
});

router.put('/', async function(req, res, next) { 
    if (apiUtility.validateParamsUndefined(req.query.task, req.query.exam))
        return res.status(400).json(errors.PARAMS_UNDEFINED);

    let q_taskid = apiUtility.castToInt(req.query.task);
    let q_examid = apiUtility.castToInt(req.query.exam);
    let b_value = req.body.value;
    let userId = req.uid;

    if (!apiUtility.validateParamsNumber(q_taskid, q_examid))
        return res.status(400).json(errors.PARAMS_WRONG_TYPE);

    try {  
        if (!(await answerImpl.checkAnswerReferTask(userId, q_examid, q_taskid)))
            return res.status(404).json(errors.ENTITY_NOT_FOUND);

        await answerImpl.updateAnswer(userId, q_taskid, q_examid, b_value);
        return res.status(204).end();
    }
    catch (err) {
        if (err.code === 'M0002')
            return res.status(404).json(err);
        else
            return next(err);
    }
});

router.delete('/', async function(req, res, next) {
    if (apiUtility.validateParamsUndefined(req.query.task, req.query.exam))
        return res.status(400).json(errors.PARAMS_UNDEFINED);

    let q_taskid = apiUtility.castToInt(req.query.task);
    let q_examid = apiUtility.castToInt(req.query.exam);
    let userId = req.uid;

    if (!apiUtility.validateParamsNumber(q_taskid, q_examid))
        return res.status(400).json(errors.PARAMS_WRONG_TYPE);

    try {
        await answerImpl.deleteAnswer(userId, q_taskid, q_examid);
        return res.status(204).end();
    }
    catch (err) {
        if (err.code === 'M0002')
            return res.status(404).json(err);
        else
            return next(err);
    }
});

module.exports = router;