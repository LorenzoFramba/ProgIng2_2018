let ExamDb = require('../../mock/mockedExam');
let UserDb = require('../../mock/mockedUser');

const Exam = require('../../model/exam');

//it checks whether the user can get acces to an exam by giving the exam id. only the owner can get access to it, to modify it, get it or erase it 
async function checkUserAccessOnExam( userId_caller, examId) {
    return userId_caller === await getExamOwner(examId);
}

//checks the body and returns false if any of the parameters are not defined, otherwise returns true
async function check_body(body) {
    if (body.id === undefined 
        || body.ownerId === undefined
        || body.name === undefined
        || body.duration === undefined
        || body.deadline === undefined
        || body.startDate === undefined
        || body.groupId === undefined
        || body.countTask === undefined){
            return false;
        }
    else
        return true;
}

//creates the exam
function createExam(body) {
    return new Exam(
        body.id,
        body.ownerId,
        body.name, 
        body.duration,
        body.deadline,
        body.startDate,
        body.groupId,
        body.countTask 
    );
}

// gets the exam
async function getExam(userId, examId) {
    try {
        let examDb = new ExamDb();
        return await ExamDb.read({ userId: userId, examId: examId });
    }
    catch (err) {
        throw err;
    }
}

// adds the exam, by first creating it and then inserting it in the mocked DB
async function addExam(value) {
    try {
        let exam = createExam(value);
        let examDb = new ExamDb();

        await examDb.create(exam);
    }
    catch (err) {
        throw err;
    }
}
//updates un exam, it requires the owner of the exam, the Id of the exam and the value of the exam (body)
async function updateExam(value) {
    try {
        let exam = createExam(value);   
        let examDb = new ExamDb();

        await examDb.update(exam);
    }
    catch (err) {
        throw err;
    }
}
//deletes an exam, it needs the owner of the exam (userID) and the exam id
async function deleteExam(userId, examId) {
    try {
        let examDb = new ExamDb();
        await examDb.delete({ userId: userId, examId: examId });
    }
    catch (err) {
        throw err;
    }
}
//exports the modules
module.exports = {
    checkUserAccessOnExam: checkUserAccessOnExam,
    check_body: check_body,
    addExam: addExam,
    getExam: getExam,
    updateExam: updateExam,
    deleteExam: deleteExam
}