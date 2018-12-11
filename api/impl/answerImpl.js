let ExamDb = require('../../mock/mockedExam');
let TaskDb = require('../../mock/mockedTask');
let UserDb = require('../../mock/mockedUser');
let AnswerDb = require('../../mock/mockedAnswer');

const Answer = require('../../model/answer');

async function checkAnswerReferTask(userId, examId, taskId) {
    try {
        let userDb = new UserDb();
        let userFound = await userDb.read({ id: userId });

        let examFound = userFound.exams.find(e => e.examId === examId);
        return examFound !== undefined ? examFound.assignedTask.includes(taskId) : false;
    } 
    catch (err) {
        throw err;
    }
}

function createAnswer(userId, taskId, examId, value) {
    return new Answer(userId, examId, taskId, value);
}

// DB
async function getAnswer(userId, examId, taskId) {
    try {
        let answerDb = new AnswerDb();
        return await answerDb.read({ userId: userId, examId: examId, taskId: taskId });
    }
    catch (err) {
        throw err;
    }
}

async function addAnswer(userId, taskId, examId, value) {
    try {
        let answer = createAnswer(userId, taskId, examId, value);

        let answerDb = new AnswerDb();
        await answerDb.create(answer);
    }
    catch (err) {
        throw err;
    }
}

async function updateAnswer(userId, taskId, examId, value) {
    try {
        let answer = createAnswer(userId, taskId, examId, value);
        
        let answerDb = new AnswerDb();
        await answerDb.update(answer);
    }
    catch (err) {
        throw err;
    }
}

async function deleteAnswer(userId, taskId, examId) {
    try {
        let answerDb = new AnswerDb();
        await answerDb.delete({ userId: userId, taskId: taskId, examId: examId });
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    addAnswer: addAnswer,
    getAnswer: getAnswer,
    updateAnswer: updateAnswer,
    deleteAnswer: deleteAnswer,
    checkAnswerReferTask: checkAnswerReferTask
}