const express = require('express');
const apiUtility = require('../utility.js');
const errors = require('../errorMsg.js');
const examimpl = require('../impl/examImpl');

let router_exam = express.Router();
let exam_model = require('../../model/exam.js');
let ExamDb = require('../../mock/mockedExam');

var exami = new Array();



router_exam.get("/", async function (req, res, next) {
    let q_userid = parseInt(req.query.user);
    let q_taskid = parseInt(req.query.task);
    let q_examid = parseInt(req.query.exam);

    let examId = req.uid;

    if (apiUtility.validateParamsUndefined(q_userid, q_taskid, q_examid))
        res.status(400).json(errors.PARAMS_UNDEFINED);

    if (!apiUtility.validateParamsNumber(q_userid, q_taskid, q_examid))
        res.status(400).json(errors.PARAMS_WRONG_TYPE);
    try {
        if (!(await examimpl.checkUserAccessOnExam(q_userid, userId, q_examid)))
            res.status(400).json(errors.ACCESS_NOT_GRANTED);
        
        let exam = await examimpl.getAnswer(q_userid, q_examid, q_taskid);
        if (exam === undefined)
            res.status(404).send(errors.ENTITY_NOT_FOUND);
        else
            res.status(200).json(answer);
    }
    catch (err) {
        next(err);
    }
});







router.post('/', async function (req, res, next) {
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

router.put('/', async function (req, res, next) { // next passa al middleware l'errore. se trovo un errore, vengono beccati dal catch, passati tramite il next al middleware
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

router.delete('/', async function (req, res, next) {
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








router_exam.post("/", function (req, res) {

    let tkOnBody = req.body;
    if (tkOnBody === undefined) {
        res.status(400).send();
        return;
    }


    if (tkOnBody.id === undefined
        || tkOnBody.name === undefined
        || tkOnBody.duration === undefined
        || tkOnBody.deadline === undefined
        || tkOnBody.startDate === undefined
        || tkOnBody.groupId === undefined
        || tkOnBody.CountTaks === undefined) {
        res.status(400).send();
        return;
    }

    let exam = new Exam(
        id,
        req.body.name,
        req.body.duration,
        req.body.deadline,
        req.body.startDate,
        req.body.groupId,
        req.body.countTask
    );
    exami.push(exam);
    res.status(201).send(exam);
    return;
})

router_exam.delete("/:id", function (req, res) {

    res.send({ type: 'DELETE' });
})

router_exam.put("/:id", function (req, res) {

    res.end({ type: 'PUT' });
})

module.exports = router_exam;













