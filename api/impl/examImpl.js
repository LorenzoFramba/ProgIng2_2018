let ExamDb = require('../../mock/mockedExam');
let UserDb = require('../../mock/mockedUser');
let GroupDb = require('../../mock/mockedGroup');
let TaskDb = require('../../mock/mockedTask');

const Exam = require('../../model/exam');

//checks the body and returns false if any of the parameters are not defined, otherwise returns true
function check_body(body) {
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
async function getExam(examId) {
    try {
        let examDb = new ExamDb();
        return await examDb.read({id: examId});
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
async function updateExam(userId,examId,value) {
    try {
        let exam = createExam(value);   
        exam.id = examId;
        exam.ownerId = userId;
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
        await examDb.delete({id: examId, ownerId: userId});
    }
    catch (err) {
        throw err;
    }
}

async function validateOwner(userId,examId) {
    try {
        let examDb = new ExamDb();
        let exam = await examDb.read({id: examId});

        if(exam.ownerId == userId)
            return true;
        else
            return false;
    }
    catch (err) {
        throw err;
    }
}

async function getAllExams(userId) {
    try {
        let examDb = new ExamDb();
        return await examDb.getAllExams(userId);
    }
    catch (err) {
        throw err;
    }
}

async function getAllExamTasks(userId, examId) {
    try {
        let examDb = new ExamDb();
        return await examDb.getTasks(userId,examId);
    }
    catch (err) {
        throw err;
    }
}

function getSubset(set, n) {
    let subset = []

    for (let i = 0; i < n; ++i) {
        if (i < set.length) 
            subset.push(set[i]);
        else 
            break;
    }

    return subset;
}

async function setUserTasks(examId, groupId) {
    try {
        let groupDb = new GroupDb();
        let taskDb = new TaskDb();
        let examDb = new ExamDb();
        let userDb = new UserDb();

        let promTasks = taskDb.getTasksByExamId(examId);
        let promExams = examDb.read({ id: examId });
        let uids = await groupDb.getUsers(groupId);
        let users = await Promise.all(uids.map(uid => userDb.read({ id: uid })));
        let tasks = await promTasks;
        let exam = await promExams;
        
        tasks = tasks.map(t => t.id);
        counter = exam.countTask;
        
        users.forEach(u => {
            let examEntry = u.exams.find(e => e.examId == examId);
            
            if (examEntry !== undefined)
                examEntry.assignedTasks = getSubset(tasks, counter);
        });
    }
    catch (err) {
        throw err;
    }
}

//exports the modules
module.exports = {
    check_body: check_body,
    addExam: addExam,
    getExam: getExam,
    updateExam: updateExam,
    deleteExam: deleteExam,
    validateOwner : validateOwner,
    getAllExams : getAllExams,
    getAllExamTasks : getAllExamTasks,
    setUserTasks: setUserTasks
}