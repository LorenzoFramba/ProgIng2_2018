const express = require('express');
const apiUtility = require('../utility.js');
const errors = require('../errorMsg.js');
const examimpl = require('../impl/examImpl');

let router_exam = express.Router();
let exam_model = require('../../model/exam.js');
let ExamDb = require('../../mock/mockedExam');

var exami = new Array();



router_exam.get("/:examId", async function (req, res, next) {

    let examId = parseInt(req.params.examId); // parsing the examID from the URL
    let userId = req.uid; 

    if (apiUtility.validateParamsUndefined(userId, examId))  //checking if the paramiters are defined
        res.status(400).json(errors.PARAMS_UNDEFINED);

    if (!apiUtility.validateParamsNumber(userId, examId))  //checking if parameters are number, otherwise they are not valid
        res.status(400).json(errors.PARAMS_WRONG_TYPE);
    try {
        if (!(await examimpl.checkUserAccessOnExam(userId, examId)))  //checks if user is the owner of the exam
            res.status(400).json(errors.ACCESS_NOT_GRANTED);
        let exam = await examimpl.getExam(userId, examId);
        if (exam === undefined)
            res.status(404).send(errors.ENTITY_NOT_FOUND);
        else
            res.status(200).json(exam);
    }
    catch (err) {
        next(err);
    }
});


router_exam.post('/', async function (req, res, next) {

    let body = req.body;
    let userId = req.uid;

    if (body === undefined)
        res.status(400).json(errors.PARAMS_UNDEFINED);
    if (!ExamImplementation.check_body(body))
        res.status(400).json(errors.PARAMS_UNDEFINED);  
    try {
        await examImpl.addExam(body);
        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
});


router_exam.put('/:examId', async function (req, res, next) {
    let examId = parseInt(req.params.examId);

    let userId = req.uid;
    let body = req.body;

    if (apiUtility.validateParamsUndefined(userId, examId))
        res.status(400).json(errors.PARAMS_UNDEFINED);

    if (!apiUtility.validateParamsNumber(userId, examId))
        res.status(400).json(errors.PARAMS_WRONG_TYPE);

    if (body === undefined)
        res.status(400).json(errors.PARAMS_UNDEFINED);
    if (!ExamImplementation.check_body(body))
        res.status(400).json(errors.PARAMS_UNDEFINED);
    try {
        if (!(await examimpl.checkUserAccessOnExam(userId, examId)))
            res.status(400).json(errors.ACCESS_NOT_GRANTED);
        await examImpl.updateExam(body);
        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
});

router_exam.delete('/:examId', async function (req, res, next) {
    let examId = parseInt(req.params.examId);

    let userId = req.uid;

    if (apiUtility.validateParamsUndefined(userId, examId))
        res.status(400).json(errors.PARAMS_UNDEFINED);

    if (!apiUtility.validateParamsNumber(userId, examId))
        res.status(400).json(errors.PARAMS_WRONG_TYPE);

    try {
        if (!(await examimpl.checkUserAccessOnExam(userId, examId)))
            res.status(400).json(errors.ACCESS_NOT_GRANTED);
        await examImpl.deleteExam(userId, examId);
        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
});

module.exports = router_exam;






