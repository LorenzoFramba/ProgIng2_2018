const express = require('express');
const apiUtility = require('../utility.js');
const errors = require('../errorMsg.js');
const examimpl = require('../impl/examImpl');

let router_exam = express.Router();
let exam_model = require('../../model/exam.js');
let ExamDb = require('../../mock/mockedExam');

var exami = new Array();



router_exam.get("/", async function (req, res, next) {
    let q_ownerid = parseInt(req.query.user);
    let q_examid = parseInt(req.query.exam);

    let examId = req.uid;

    if (apiUtility.validateParamsUndefined(q_ownerid, q_examid))
        res.status(400).json(errors.PARAMS_UNDEFINED);

    if (!apiUtility.validateParamsNumber(q_ownerid, q_examid))
        res.status(400).json(errors.PARAMS_WRONG_TYPE);
    try {
        if (!(await examimpl.checkUserAccessOnExam(q_userid, userId, q_examid)))
            res.status(400).json(errors.ACCESS_NOT_GRANTED);

        let exam = await examimpl.getExam(q_userid, q_examid);
        if (exam === undefined)
            res.status(404).send(errors.ENTITY_NOT_FOUND);
        else
            res.status(200).json(answer);
    }
    catch (err) {
        next(err);
    }
});


router_exam.post('/', async function (req, res, next) {
    let q_ownerid = parseInt(req.query.user);
    let q_examid = parseInt(req.query.exam);
    let b_value = req.body.value;
    let userId = req.uid;

    if (apiUtility.validateParamsUndefined(q_ownerid, q_examid))
        res.status(400).json(errors.PARAMS_UNDEFINED);

    if (!apiUtility.validateParamsNumber(q_ownerid, q_examid))
        res.status(400).json(errors.PARAMS_WRONG_TYPE);

    try {
        await examImpl.addExam(userId, q_examid, b_value);
        res.status(204).end();
    }
    catch (err) {
        next(err);
    }

});


router_exam.put('/', async function (req, res, next) { 
    let q_ownerid = parseInt(req.query.user);
    let q_examid = parseInt(req.query.exam);

    let examId = req.uid;

    if (apiUtility.validateParamsUndefined(q_ownerid, q_examid))
        res.status(400).json(errors.PARAMS_UNDEFINED);

    if (!apiUtility.validateParamsNumber(q_ownerid, q_examid))
        res.status(400).json(errors.PARAMS_WRONG_TYPE);

    try {  
        await answerImpl.updateExam(userId, q_examid, b_value);
        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
});

router_exam.delete('/', async function (req, res, next) {
    let q_ownerid = parseInt(req.query.user);
    let q_examid = parseInt(req.query.exam);

    let examId = req.uid;

    if (apiUtility.validateParamsUndefined(q_ownerid, q_examid))
        res.status(400).json(errors.PARAMS_UNDEFINED);

    if (!apiUtility.validateParamsNumber(q_ownerid, q_examid))
        res.status(400).json(errors.PARAMS_WRONG_TYPE);


    try {
        await answerImpl.deleteAnswer(userId, q_examid);
        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
});

module.exports = router_exam;






