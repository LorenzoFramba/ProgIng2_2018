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
}

module.exports = MockedExam;