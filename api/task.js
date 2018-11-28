let express = require('express');
let router = express.Router();
let Task = require("../model/task");
let tasks = new Array();

// post a new task 
router.post("/", function(req, res){
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
})

// get a task from ID 
router.get("/:id", function(req, res){
    let taskId = req.url.id;
    if (taskId == undefined)
        res.status(400).send();
    let valueReturned = tasks.find((taskId) => {return task.id == taskId});
    if (valueReturned == undefined)
        res.status(404).send("task not found");
    else 
        res.status(200).send(valueReturned);
})

// change body's task from ID
router.put("/:id", function(req, res){
    res.end();
})

// delete task from ID
router.delete("/:id", function(req, res){
    res.end();
})

module.exports = router;