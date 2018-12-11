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

    getAllExams() {
        return new Promise((resolve,reject) => {
            if(exam_data === undefined)
                resolve(undefined);
            else
                resolve(exam_data);
        });
    }

    getTasks(examId) {
        return new Promise((resolve,reject) => {
            let examFound = exam_data.find(ex => ex.id === examId);

            if(examFound === undefined)
                resolve(undefined);
            else if(examFound.exams === undefined)
                resolve(undefined);
            else
                resolve(userFound.exams);
        });
    }
}

module.exports = MockedExam;