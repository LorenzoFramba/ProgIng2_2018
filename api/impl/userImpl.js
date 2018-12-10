let ExamDb = require('../../mock/mockedExam');
let UserDb = require('../../mock/mockedUser');

const User = require('../../model/user');

function createUser(id, name, lastname, email, password, exams) {
    return new User(id, name, lastname, email, password, exams);
}

// DB
async function getUser(userId) {
    try {
        let userDb = new UserDb();
        return await userDb.read({ id: userId });
    }
    catch (err) {
        throw err;
    }
}

async function addUser(name, lastname, email, password,exams) {
    try {
        
        let user = createUser(null, name, lastname, email, password, exams);
        
        let userDb = new UserDb();
        await userDb.create(user);
    }
    catch (err) {
        throw err;
    }
}

async function updateUser(userId, name, lastname, email, password) {
    let examUser;
    let userDb = new UserDb();
    try {
        let userFound = await userDb.read({id : userId});
        examUser = userFound.exams;
    }
    catch (err) {
        throw err;
    }
    
    try {
        let user = createUser(userId, name, lastname, email, password, examUser);
        await userDb.update(user);
    }
    catch (err) {
        throw err;
    }
}

async function deleteUser(userId) {
    try {
        let userDb = new UserDb();
        await userDb.delete({ id: userId });
    }
    catch (err) {
        throw err;
    }
}

function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

module.exports = {
    addUser : addUser,
    updateUser : updateUser,
    getUser : getUser,
    deleteUser : deleteUser,
    validateEmail : validateEmail
}