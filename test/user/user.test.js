const fetch = require("node-fetch");
const User = require("../../model/user");
const ExamUser = require("../../model/examUser");
const PrAnswer = require("../../model/prAnswer");
const errors = require('../../api/errorMsg');
const utils = require('../utility');

let users = Array();
let prAnswers = Array();
let userEndpoint = utils.createUrl('Users');
const userData = {
    email: 'marco@rossi.it',
    password: 'marco'
}

const userToDel = {
    email: 'luca@biachi.it',
    password: 'luca'
}

let header;
let headerToDel;

//inizializzo i casi di test
beforeAll(async () => {
    users.push(new User(null, "Marco", "Rossi",'marco@rossi.it', "marco", []));
    prAnswers.push(new PrAnswer(1,1))
    header = await utils.getAuthHeader(userData.email, userData.password);
    headerToDel = await utils.getAuthHeader(userToDel.email, userToDel.password);

    jest.setTimeout(100000); //evito che le richieste vadano in timeout troppo presto (mi serve per debug)
})

//classe di test par la post user
describe('POST /Users', () => {
    test("Success -> 201 (Created)", async () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'POST',
            body: JSON.stringify(users[0]),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(1); //mi aspetto 2 expect, return importante se no salta, => indica la callback
        let res = await fetch(userEndpoint, options);
        expect(res.status).toBe(201);

    });
    
    test("Failed -> 400 (Bad request) :: wrong body data", async () => {
        let options = {
            method: 'POST',
            body: "wrong data"
        }

        expect.assertions(2);
        let res = await fetch(userEndpoint, options)
        let jsonRes = await res.json();
        expect(res.status).toBe(400);
        expect(jsonRes).toEqual(errors.PARAMS_UNDEFINED);

    });


    test("Failed -> 400 (Bad request) :: wrong user data", async () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new User(123, "bo", undefined, undefined, undefined, undefined, undefined)),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(2);
        let res = await fetch(userEndpoint, options)
        let jsonRes = await res.json();
        expect(res.status).toBe(400);
        expect(jsonRes).toEqual(errors.PARAMS_UNDEFINED);
    });

})

describe("GET /Users", () => {
    let options;
    beforeAll(() => {
        options = {
            method: 'GET',
            headers: header
        };
    });

    test("Success -> 200 (OK)", async () => {
        expect.assertions(2);
        let res = await fetch(userEndpoint, options);
        let userReturned = await res.json();
        expect(res.status).toBe(200);
        users[0].id = userReturned.id;
        users[0].exams = userReturned.exams;
        expect(userReturned).toEqual(users[0]);
    });

    test("Failed -> 401 (Unauthorized) :: Token not valid", async () => {
        //opzioni da mettere nella richiesta
        let optionsWrong = {
            method: 'GET'
        }

        expect.assertions(2);
        let res = await fetch(userEndpoint, optionsWrong);
        let jsonRes = await res.json();
        expect(res.status).toBe(401);
        expect(jsonRes).toEqual(errors.INVALID_TOKEN);
        
    });
})

describe("DELETE /Users", () => {
    let options;
    beforeAll(() => {
        options = {
            method: 'DELETE',
            headers: headerToDel
        };
    });

    test("Success -> 204 (No content)", async () => {
        expect.assertions(1);
        let res = await fetch(userEndpoint, options);
        expect(res.status).toBe(204);
    });
    
    test("Failed -> 401 (Unauthorized) :: Token not valid", async () => {
        //opzioni da mettere nella richiesta
        let optionsWrong = {
            method: 'DELETE'
        }

        expect.assertions(2);
        let res = await fetch(userEndpoint, optionsWrong);
        let jsonRes = await res.json();
        expect(res.status).toBe(401);
        expect(jsonRes).toEqual(errors.INVALID_TOKEN);
    });
    
})

describe('PUT /Users', () => {
    test("Success -> 204 (OK)", async () => {
        //opzioni da mettere nella richiesta.
        const usrToMod = {
                "name" : "Mario",
                "lastname" : "Rossi",
                "email" : "mario@rossi.it",
                "password" : "ciccio"
            }

        let myHeader = {};
        Object.assign(myHeader,{"Content-Type":"application/json"},header);
        let options = {
            method: 'PUT',
            body: JSON.stringify(usrToMod),
            headers : myHeader
        }

        expect.assertions(1); //mi aspetto 2 expect, return importante se no salta, => indica la callback
        let res = await fetch(userEndpoint, options);
        expect(res.status).toBe(204);

    });
    
    test("Failed -> 400 (Bad request) :: wrong body data", async () => {
        let options = {
            method: 'PUT',
            body: "wrong data",
            headers : header
        }

        expect.assertions(2);
        let res = await fetch(userEndpoint, options)
        let jsonRes = await res.json();
        expect(res.status).toBe(400);
        expect(jsonRes).toEqual(errors.PARAMS_UNDEFINED);

    });


    test("Failed -> 400 (Bad request) :: wrong user data", async () => {
        let myHeader = {};
        Object.assign(myHeader,{"Content-Type":"application/json"},header);
        let options = {
            method: 'PUT',
            body: JSON.stringify(new User(123, "bo", undefined, undefined, undefined, undefined, undefined)),
            headers : myHeader
        }

        expect.assertions(2);
        let res = await fetch(userEndpoint, options)
        let jsonRes = await res.json();
        expect(res.status).toBe(400);
        expect(jsonRes).toEqual(errors.PARAMS_UNDEFINED);
    });

    test("Failed -> 401 (Unauthorized) :: token not valid", async () => {
        let options = {
            method: 'PUT',
            body: JSON.stringify(users[0])
        }

        expect.assertions(2);
        let res = await fetch(userEndpoint, options)
        let jsonRes = await res.json();
        expect(res.status).toBe(401);
        expect(jsonRes).toEqual(errors.INVALID_TOKEN);

    });

})

describe("GET /Users/Exams", () => {
    let options;
    let exams = [];
    beforeAll(() => {
        options = {
            method: 'GET',
            headers: header
        };
        exams.push(new ExamUser(0,
            '2018-12-05T14:43:00.000Z',
            [1,2,3,4,5],
            prAnswers,
            25))
    });

    test("Success -> 200 (OK)", async () => {
        expect.assertions(2);
        let res = await fetch(userEndpoint + "/Exams", options);
        let examsReturned = await res.json();

        expect(res.status).toBe(200);
        expect(examsReturned).toMatchObject(exams);
    });

    test("Failed -> 401 (Unauthorized) :: Token not valid", async () => {
        //opzioni da mettere nella richiesta
        let optionsWrong = {
            method: 'GET'
        }

        expect.assertions(2);
        let res = await fetch(userEndpoint + "/Exams", optionsWrong);
        let jsonRes = await res.json();
        expect(res.status).toBe(401);
        expect(jsonRes).toEqual(errors.INVALID_TOKEN);
        
    });
})

describe("GET /Users/Exams/:examId/Tasks", () => {
    let options;
    let tasks = [];
    beforeAll(() => {
        options = {
            method: 'GET',
            headers: header
        };
        tasks = [1,2,3,4,5];
    });

    test("Success -> 200 (OK)", async () => {
        expect.assertions(2);
        let res = await fetch(userEndpoint + "/Exams/0/Tasks", options);
        let tasksReturned = await res.json();
        expect(res.status).toBe(200);
        expect(tasksReturned).toEqual(tasks);
    });

    test("Failed -> 401 (Unauthorized) :: Token not valid", async () => {
        //opzioni da mettere nella richiesta
        let optionsWrong = {
            method: 'GET'
        }

        expect.assertions(2);
        let res = await fetch(userEndpoint + "/Exams/0/Tasks", optionsWrong);
        let jsonRes = await res.json();
        expect(res.status).toBe(401);
        expect(jsonRes).toEqual(errors.INVALID_TOKEN);
        
    });
})
