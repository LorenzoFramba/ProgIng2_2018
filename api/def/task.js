// declarations
let express = require('express');
let router = express.Router();

const apiUtility = require('../utility.js');
const errors = require('../errorMsg.js');
const taskImplementation = require('../impl/taskImpl');

// implementation
// we include next to catch errors passing with the middleware
router.get('/:id/:exam', async function (req, res, next) {
    const task_id = parseInt(req.params.id);
    const exam_id = parseInt(req.params.exam);
    let userId = req.uid;
    // check if some parameter is undefined or not valid
    if (apiUtility.validateParamsUndefined(task_id, exam_id))
        res.status(400).json(errors.PARAMS_UNDEFINED);

    try {
        // if it is found return the object, else return status code 404 not found
        let check = await taskImplementation.checkParams(task_id, exam_id);
        if (check === undefined)
            res.status(404).send(errors.ENTITY_NOT_FOUND);
        else
            res.status(200).json(check);
    } catch (err) {
        next(err);
    }
});

router.post('/', async function (req, res, next) {
    let tkBody = req.body;
    let userId = req.uid;

    let id = tkBody.id;
    let examId = tkBody.examId;
    let text = tkBody.text;
    let options = tkBody.options;
    let score = tkBody.score;
    let isPeerReview = tkBody.isPeerReview;
    let category = tkBody.category;
    let correctAnswer = tkBody.correctAnswer;
    //check the single status of the body and also every parameters
    if (tkBody === undefined)
        return res.status(400).json(errors.PARAMS_UNDEFINED);
    else if (apiUtility.validateParamsUndefined(id, examId, text, options, score, isPeerReview, category, correctAnswer))
        return res.status(400).send('dentro');
    else {
        try {
            await taskImplementation.addTask(tkBody);
            // The server has successfully fulfilled the request and that 
            // there is no additional content to send in the response payload body.
            return res.status(204).end();
            //TO DO : return also the posted json, try on postman 
        } catch (err) {
            next(err);
        }
    }
});

router.put('/:id/:exam', async function (req, res, next) {
    const task_id = parseInt(req.params.id);
    const exam_id = parseInt(req.params.exam);
    let tkBody = req.body;
    let userId = req.uid;
    let id = tkBody.id;
    let examId = tkBody.examId;
    let text = tkBody.text;
    let options = tkBody.options;
    let score = tkBody.score;
    let isPeerReview = tkBody.isPeerReview;
    let category = tkBody.category;
    let correctAnswer = tkBody.correctAnswer;

    // check if some parameter is undefined or not valid
    if (apiUtility.validateParamsUndefined(task_id, exam_id))
        return res.status(400).json(errors.PARAMS_UNDEFINED);
    else if (!apiUtility.validateParamsNumber(task_id, exam_id))
        return res.status(400).json(errors.PARAMS_WRONG_TYPE);

    //check the single status of the body and also every parameters
    else if (tkBody === undefined)
        return res.status(400).json(errors.PARAMS_UNDEFINED);
    else if (!taskImplementation.check_body(tkBody))
        return res.status(400).json(errors.PARAMS_UNDEFINED);
    else {
        try {
            let check = await taskImplementation.checkParams(task_id, exam_id);
            if (check === undefined)
                return res.status(404).send(errors.ENTITY_NOT_FOUND);
            else {
                await taskImplementation.updateTask(tkBody);
                return res.status(204).end();
                // to do: return the json already intert to check if all functions 
            }
        } catch (err) {
            next(err);
        }
    }
});

router.delete('/:id/:exam', async function (req, res, next) {
    const task_id = parseInt(req.params.id);
    const exam_id = parseInt(req.params.exam);
    let userId = req.uid;

    // check if some parameter is undefined or not valid
    if (apiUtility.validateParamsUndefined(task_id, exam_id))
        return res.status(400).json(errors.PARAMS_UNDEFINED);
    if (!apiUtility.validateParamsNumber(task_id, exam_id))
        return res.status(400).json(errors.PARAMS_WRONG_TYPE);

    try {
        let check = await taskImplementation.checkParams(task_id, exam_id);
        if (check === undefined)
            return res.status(404).send(errors.ENTITY_NOT_FOUND);
        else {
            await taskImplementation.deleteTask(task_id, exam_id);
            return res.status(204).end();
        }
    } catch (err) {
        next(err);
    }
});




module.exports = router;






/*
                // working with an array instead of a mocked Database


// change body's task from ID
router.put("/:id", function(req, res){

    const requestedId = req.params.id;
    let task = tasks.filter(task => {
        return task.id == requestedId;
    })[0];

    if (!task){
        res.status(404).json({message : 'Task not found'});
    }

    const index = tasks.indexOf(task);
    const keys = Object.keys(request.body);

    keys.forEach(key => {
        task[key] = request.body[key];
    })
    tasks[index] = task;
    res.status(200).json(tasks[index]);
})


// post a new task 
router.post("/", function(req, res){

    let tkOnBody = req.body;

    if (tkOnBody === undefined){
        res.status(400).send();
        return;
    }
    if (tkOnBody.id === undefined 
        || tkOnBody.text === undefined
        || tkOnBody.options === undefined
        || tkOnBody.score === undefined
        || tkOnBody.isPeerReview === undefined
        || tkOnBody.category === undefined
        || tkOnBody.correctAnswer === undefined){
            res.status(400).send();
            return;
        }

    let task = new Task (
        req.body.id,
        req.body.text,
        req.body.options,
        req.body.score,
        req.body.isPeerReview,
        req.body.category,
        req.body.correctAnswer
    );
    tasks.push(task);
    res.status(201).send(task);
    return;
})

// get a task from ID 
router.get("/:id", function(req, res){
    const requestedId = req.params.id;
    let task = tasks.filter(task => {
        return task.id == requestedId;
    })

    if (!task){
        res.status(404).json({message : 'Task not found'});
    }
    else {
        res.status(200).json(task[0]);
    }
})


// delete task from ID
router.delete("/:id", function(req, res){
    const requestedId = req.params.id;
    let task = tasks.filter(task => {
        return task.id == requestedId;
    })

    if (!task){
        res.status(404).json({message : 'Task not found'});
    }

    const index = tasks.indexOf(task);
    tasks.splice(index,1);

    res.json({message : 'Task deleted'});
})

module.exports = router;

*/