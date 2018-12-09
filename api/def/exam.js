const express = require('express');
const apiUtility = require('../utility.js');
const errors = require('../errorMsg.js');
const examimpl = require('../impl/examImpl');

let router_exam = express.Router();
let exam_model = require('../../model/exam.js');
let ExamDb = require('../../mock/mockedExam');


router_exam.get('/:id', async function (req, res, next) {
    let examId = parseInt(req.params.id); // parsing the examID from the URL
    let userId = req.uid; 

    if (apiUtility.validateParamsUndefined(userId, examId))  //checking if the paramiters are defined
        res.status(400).json(errors.PARAMS_UNDEFINED);

    if (!apiUtility.validateParamsNumber(userId, examId))  //checking if parameters are number, otherwise they are not valid
        res.status(400).json(errors.PARAMS_WRONG_TYPE);
    try {
        let exam = await examimpl.getExam(examId);
        if (exam === undefined)
            res.status(404).send(errors.ENTITY_NOT_FOUND);
        else
            res.status(200).json(exam);
    }
    catch (err) {
        next(err);
    }
});

/*

router_exam.post('/', async function (req, res, next) {

    let body = req.body;
    let userId = req.uid;

    if (body === undefined)
        res.status(400).json(errors.PARAMS_UNDEFINED);
    if (!examimpl.check_body(body))
        res.status(400).json(errors.PARAMS_UNDEFINED);  
    try {
        await examimpl.addExam(body);
        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
});


router_exam.put('/:id', async function (req, res, next) {
    let examId = parseInt(req.params.id);

    let userId = req.uid;
    let body = req.body;

    if (apiUtility.validateParamsUndefined(userId, examId))
        res.status(400).json(errors.PARAMS_UNDEFINED);

    if (!apiUtility.validateParamsNumber(userId, examId))
        res.status(400).json(errors.PARAMS_WRONG_TYPE);

    if (body === undefined)
        res.status(400).json(errors.PARAMS_UNDEFINED);
    if (!examimpl.check_body(body))
        res.status(400).json(errors.PARAMS_UNDEFINED);
    try {
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
        await examimpl.deleteExam(userId, examId);
        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
});

*/
module.exports = router_exam;






