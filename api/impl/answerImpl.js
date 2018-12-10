let ExamDb = require('../../mock/mockedExam');
let TaskDb = require('../../mock/mockedTask');
let UserDb = require('../../mock/mockedUser');
let AnswerDb = require('../../mock/mockedAnswer');

const Answer = require('../../model/answer');

async function getExamOwner(examId) {
    try {
        let examDb = new ExamDb();
        let exam = await examDb.read({ id: examId });

        return exam === undefined ? undefined : exam.owner_id;
    }
    catch (err) {
        throw err;
    }
}

async function checkUserAccessOnExam(userId_answer, userId_caller, examId) {
    try {
        return userId_caller === userId_answer || userId_caller === await getExamOwner(examId);
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
    checkUserAccessOnExam: checkUserAccessOnExam,
    addAnswer: addAnswer,
    getAnswer: getAnswer,
    updateAnswer: updateAnswer,
    deleteAnswer: deleteAnswer
}