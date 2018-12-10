let ExamDb = require('../../mock/mockedExam');
let TaskDb = require('../../mock/mockedTask');
const Task = require('../../model/task');

async function checkParams (taskID, examID) {
    try {
        let taskDB = new TaskDb();
        return await taskDB.read({id: taskID, examId: examID});
    }
    catch (err) {
        throw err;
    }
}

function check_body (bbody) {
    if (bbody.id === undefined 
        || bbody.userId === undefined
        || bbody.text === undefined
        || bbody.options === undefined
        || bbody.score === undefined
        || bbody.isPeerReview === undefined
        || bbody.category === undefined
        || bbody.correctAnswer === undefined){
            return false;
        }
    else
        return true;
}

function nuevoTask (bbody){
    return new Task (
        bbody.id,
        bbody.examId,
        bbody.text, 
        bbody.options,
        bbody.score,
        bbody.isPeerReview,
        bbody.category,
        bbody.correctAnswer
    );
}

async function addTask (bbody){
    try {
        let task = nuevoTask(bbody);
        let taskDb = new TaskDb();
        await taskDb.create(task);
    }
    catch (err) {
        throw err;
    }
}

async function updateTask (bbody){
    try {
        let task = nuevoTask(bbody);
        let taskDB = new TaskDb();
        await taskDB.update(task);
    }
    catch(err) {
        throw err;
    }
}

async function deleteTask (task_id,exam_id){
    try {
        let taskDb = new TaskDb();
        await taskDb.delete({id:task_id, examId:exam_id});
    }
    catch (err){
        throw err;
    }
}

module.exports = {
    checkParams: checkParams,
    check_body: check_body,
    addTask: addTask,
    updateTask: updateTask,
    deleteTask: deleteTask
}