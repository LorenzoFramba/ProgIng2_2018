let ExamDb = require('../../mock/mockedExam');
let UserDb = require('../../mock/mockedUser');

const Exam = require('../../model/exam');


async function checkUserAccessOnExam(userId_owner, userId_caller, examId) {
    return userId_caller === userId_owner|| userId_caller === await getExamOwner(examId);
}


function createExam(userId, examId, value) {
    return new Exam(userId, examId, value);
}

// DB
async function getExam(userId, examId) {
    try {
        let examDb = new ExamDb();
        return await ExamDb.read({ userId: userId, examId: examId });
    }
    catch (err) {
        throw err;
    }
}

async function addExam(userId, examId, value) {
    try {
        let exam = createExam(userId, examId, value);

        let examDb = new ExamDb();
        await examDb.create(exam);
    }
    catch (err) {
        throw err;
    }
}

async function updateExam(ownerId, examId, value) {
    try {
        let exam = createExam(ownerId, examId, value);
        
        let examDb = new ExamDb();
        await examDb.update(exam);
    }
    catch (err) {
        throw err;
    }
}

async function deleteExam(userId, examId) {
    try {
        let examDb = new ExamDb();
        await examDb.delete({ userId: userId, examId: examId });
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    checkUserAccessOnExam: checkUserAccessOnExam,
    addExam: addExam,
    getExam: getExam,
    updateExam: updateExam,
    deleteExam: deleteExam
}