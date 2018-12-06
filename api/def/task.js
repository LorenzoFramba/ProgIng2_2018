let express = require('express');
let router = express.Router();
let Task = require("../../model/task");
let tasks = new Array();

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