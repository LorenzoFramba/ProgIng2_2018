let TaskPrototype = require('../model/abstract/taskPrototype.js');
let task_data = require('./data/task_data');
const Task = require('../model/task');
const genericMockFunctions = require('./mockedEntity');

class MockedTask extends TaskPrototype {
    constructor() {
        super();
        this.__ids__ = ['id', 'examId'];

        let boundedInjector = genericMockFunctions.bind(this);
        boundedInjector(MockedTask, Task, task_data);
    }
}

module.exports = MockedTask;