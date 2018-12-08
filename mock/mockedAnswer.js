let AnswerPrototype = require('../model/abstract/answerPrototype.js');
let answer_data = require('./data/answer_data');
const Answer = require('../model/answer');
const genericMockFunctions = require('./mockedEntity');

class MockedAnswer extends AnswerPrototype {
    constructor() {
        super();
        this.__ids__ = ['userId', 'examId', 'taskId'];
        
        let boundedInjector = genericMockFunctions.bind(this);
        boundedInjector(MockedAnswer, Answer, answer_data);
    }
}

module.exports = MockedAnswer;