let UserPrototype = require('../model/abstract/userPrototype.js');
const User = require('../model/user');
const ExamUser = require('../model/examUser');
const user_data = require('./data/user_data');
const genericMockFunctions = require('./mockedEntity.js');
const errorMsg = require('./error');

//Intefaccia con DB (in questo caso mocked), inserire operazioni strettamente legate al DB
class MockedUser extends UserPrototype {
    constructor() {
        super();
        this.__ids__ = ['id'];

        let boundedInjector = genericMockFunctions.bind(this);
        boundedInjector(MockedUser, User, user_data);
    }

    getExams(user) {
        return new Promise((resolve,reject) => {
            let userFound = user_data.find(u => u.id === user);

            if(userFound === undefined)
                resolve(undefined);
            else if(userFound.exams === undefined)
                resolve(undefined);
            else
                resolve(userFound.exams);
        });
    }

    getTasks(user, exam) {
        return new Promise((resolve,reject) => {
            let userFound = user_data.find(u => u.id === user);

            if(userFound === undefined)
                resolve(undefined);
            else if(userFound.exams === undefined)
                resolve(undefined);
            else {
                let examsReturned = userFound.exams;
                let tmp = examsReturned.find(el => el.examId === exam);
                if(tmp === undefined)
                    resolve(undefined);
                else{
                    let myexam = Object.create(ExamUser.prototype);
                    Object.assign(myexam,tmp);
                    resolve(myexam.assignedTasks);
                }
            }
                
        });
    }

    authenticate(email, password) {
        return new Promise((resolve, reject) => {
            let userFound = user_data.find(u => u.email == email && u.password == password);

            if (userFound === undefined)
                reject(errorMsg.ENTITY_NOT_FOUND);
            else
                resolve(userFound.id);
        });
    }

    getUserByMail(mail){
        if (arguments.length !== 1 || typeof mail !== "string")
            return null;

        //cls cls.... storage
        return new Promise((resolve, reject) => {

            var user = null;
            for (let u of user_data){
                if (u.email === mail){
                    user = u.id;
                    break;
                }
            }

            //let entity = Object.assign(Object.create(User), user);
            resolve(user);
        });
    }
}

module.exports = MockedUser;