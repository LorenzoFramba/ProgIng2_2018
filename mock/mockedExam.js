let ExamPrototype = require('../model/abstract/examPrototype');
let exam_data = require('./data/exam_data');
const Exam = require('../model/exam');
const genericMockFunctions = require('./mockedEntity');

class MockedExam extends ExamPrototype {
    constructor() {
        super();
        this.__ids__ = ['id'];
        
        let boundedInjector = genericMockFunctions.bind(this);
        boundedInjector(MockedExam, Exam, exam_data);
    }

    getAllExams(userId) {
        return new Promise((resolve,reject) => {
            let exams = exam_data.filter(
                (el) => {
                    return el.ownerId === userId
                });
            if(exams === undefined)
                resolve(undefined);
            else
                resolve(exams);
        });
    }

    getTasks(userId, examId) {
        return new Promise((resolve,reject) => {
            let examFound = exam_data.find(ex => {
                return ex.id === examId && ex.ownerId === userId
            });

            if(examFound === undefined)
                resolve(undefined);
            else
                resolve(examFound.tasks);
        });
    }
}

module.exports = MockedExam;