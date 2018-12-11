const fetch = require("node-fetch");
let Exam = require("../../model/exam.js");
const errors = require('../../api/errorMsg');
const utils = require('../utility');

let exams = Array();
const examEndpoint = utils.createUrl('Exams');
let header;
let token;
let tokenToDel;

const userData = {
	email : "gino@pino.it",
	password : "ciccio"
}

//inizializzo i casi di test
beforeAll(async () => {

    exams.push(new Exam(123, 321, "analisi", 32.3 ,'2019-10-05T14:48:00.000Z' , '2019-10-05T14:48:00.000Z', 4345, 43,[]));
    
    header = await utils.getAuthHeader(userData.email, userData.password);

    jest.setTimeout(100000); //evito che le richieste vadano in timeout troppo presto
});


//classe di test par la post user
describe('POST /Exams', () => {
    let myHeader = {};
    beforeAll(() => {
        Object.assign(myHeader,{"Content-Type":"application/json"},header);
    })
    test("Success -> 204 (OK)", async () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'POST',
            body: JSON.stringify(exams[0]),
            headers: myHeader
        }

        expect.assertions(1); //mi aspetto 2 expect, return importante se no salta, => indica la callback
        let res = await fetch(examEndpoint, options);
        expect(res.status).toBe(204);
    });

    test('Failed -> 400 (Bad request) :: wrong body data', () => {

        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(213, 
                321, 
                "analisi", 
                32.3 ,
                '2019-10-05T14:48:00.000Z'  , 
                '2019-10-05T14:48:00.000Z', undefined, 43,[])),
            headers: myHeader
        }

        return fetch(examEndpoint, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });
    test('Failed -> 400 (Bad request) :: wrong body data', () => {
        
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(213, 
                321, 
                "analisi",
                32.3 ,
                '2019-10-05T14:48:00.000Z'  , 
                '2019-10-05T14:48:00.000Z' ,
                43,undefined,[])),
            headers: myHeader
        }

        return fetch(examEndpoint, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });
    test('Failed -> 400 (Bad request) :: wrong body data', () => {

        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(213, 321, "analisi", 32.3 ,'2019-10-05T14:48:00.000Z'  , undefined , 324, 43, [])),
            headers: myHeader
        }

        return fetch(examEndpoint, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });
    test('Failed -> 400 (Bad request) :: wrong body data', () => {

        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(213, 321, "analisi", 32.3 ,undefined , '2019-10-05T14:48:00.000Z' , 345, 43, [])),
            headers: myHeader
        }

        return fetch(examEndpoint, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });
    test('Failed -> 400 (Bad request) :: wrong body data', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(213, 321, "analisi", undefined ,'2019-10-05T14:48:00.000Z'  , '2019-10-05T14:48:00.000Z' , 543, 43, [])),
            headers: myHeader
        }

        return fetch(examEndpoint, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });
    test('Failed -> 400 (Bad request) :: wrong body data', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(213, 321, undefined, 32.3 ,'2019-10-05T14:48:00.000Z'  , '2019-10-05T14:48:00.000Z' , 54, 43, [])),
            headers: myHeader
        }

        return fetch(examEndpoint, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });
    test('Failed -> 400 (Bad request) :: wrong body data', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(213, undefined, "analisi", 32.3 ,'2019-10-05T14:48:00.000Z'  , '2019-10-05T14:48:00.000Z' , 54, 43, [])),
            headers: myHeader
        }

        return fetch(examEndpoint, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });
    test('Failed -> 400 (Bad request) :: wrong body data', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(undefined, 321, "analisi", 32.3 ,'2019-10-05T14:48:00.000Z'  , '2019-10-05T14:48:00.000Z' , 54, 43, [])),
            headers: myHeader
        }

        return fetch(examEndpoint, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

});


describe("GET /Exams", () => {
    let options;
    beforeAll(() => {
        options = {
            method: 'GET',
            headers: header
        };
    });

    test("Success -> 200 (OK)", async () => {
        let myexam = [
            {
                "id": 0,
                "ownerId": 0,
                "name": "CI",
                "duration": 120,
                "deadline": "2019-10-05T14:48:00.000Z",
                "startDate": "2019-10-04T14:48:00.000Z",
                "groupId": 0,
                "countTask": 10,
                "tasks": [0,1,2,3]
            },
            {
                "id": 1,
                "ownerId": 0,
                "name": "CI",
                "duration": 130,
                "deadline": "2019-10-05T14:48:00.000Z",
                "startDate": "2019-10-04T14:48:00.000Z",
                "groupId": 3,
                "countTask": 10,
                "tasks": []
            },
            {
                "id": 2,
                "ownerId": 0,
                "name": "CI",
                "duration": 120,
                "deadline": "2019-10-05T14:48:00.000Z",
                "startDate": "2019-10-04T14:48:00.000Z",
                "groupId": 2,
                "countTask": 12,
                "tasks": []
            }
        ]
        
        expect.assertions(2);
        let result = await fetch(examEndpoint, options);
        let examReturned = await result.json();
        expect(result.status).toBe(200);
        
        expect(examReturned).toEqual(myexam);
    });

    test("Failed -> 401 (Unauthorized) :: Token not valid", async () => {
        //opzioni da mettere nella richiesta
        let optionsWrong = {
            method: 'GET'
        }
        expect.assertions(1);
        let result = await fetch(examEndpoint, optionsWrong);
        expect(result.status).toBe(401);
        
    });
});

describe("GET /Exam/:examId", () => {
    let options;
    beforeAll(() => {
        options = {
            method: 'GET',
            headers: header
        };
    });

    test("Success -> 200 (OK)", async () => {
        let myexam = {
                'id': 0,
                'ownerId': 0,
                'name': 'CI',
                'duration': 120,
                'deadline': '2019-10-05T14:48:00.000Z',
                'startDate': '2019-10-04T14:48:00.000Z',
                'groupId': 0,
                'countTask': 10,
                'tasks' : [0,1,2,3]
            }
        
        expect.assertions(2);
        let result = await fetch(examEndpoint + "/0", options);
        let examReturned = await result.json();
        expect(result.status).toBe(200);
        
        expect(examReturned).toEqual(myexam);
    });

    test("Failed -> 404 (Not found)", async () => {
       
        expect.assertions(2);
        let result = await fetch(examEndpoint + "/123", options);
        let jsonRes = await result.json();
        expect(result.status).toBe(404);
        
        expect(jsonRes).toEqual(errors.ENTITY_NOT_FOUND);
    });

    test("Failed -> 401 (Unauthorized) :: Token not valid", async () => {
        //opzioni da mettere nella richiesta
        let optionsWrong = {
            method: 'GET'
        }
        expect.assertions(1);
        let result = await fetch(examEndpoint + "/0", optionsWrong);
        expect(result.status).toBe(401);
        
    });
});


describe("GET /Exams/:examId/Tasks", () => {
    let options;
    beforeAll(() => {
        options = {
            method: 'GET',
            headers: header
        };
    });

    test("Success -> 200 (OK)", async () => {
        let myTasks = [0,1,2,3];
        
        expect.assertions(2);
        let result = await fetch(examEndpoint + "/0/Tasks", options);
        let tasksRet = await result.json();
        expect(result.status).toBe(200);
        
        expect(tasksRet).toEqual(myTasks);
    });

    test("Failed -> 404 (Not found)", async () => {
       
        expect.assertions(2);
        let result = await fetch(examEndpoint + "/123/Tasks", options);
        let jsonRes = await result.json();
        expect(result.status).toBe(404);
        
        expect(jsonRes).toEqual(errors.ENTITY_NOT_FOUND);
    });

    test("Failed -> 401 (Unauthorized) :: Token not valid", async () => {
        //opzioni da mettere nella richiesta
        let optionsWrong = {
            method: 'GET'
        }
        expect.assertions(1);
        let result = await fetch(examEndpoint + "/0/Tasks", optionsWrong);
        expect(result.status).toBe(401);
        
    });
});


//DELETE
describe("DELETE /Exams", () => {
    let options;
    beforeAll(() => {
        options = {
            method: 'DELETE',
            headers: header
        };
    });
    test("Success -> 204 (OK)", async () => {
        expect.assertions(1);
        let res = await fetch(examEndpoint + "/1", options);
        expect(res.status).toBe(204);
    });

    test("Failed -> 401 (Unauthorized) :: Token not used", async () => {
        let wrongOpt = {};
        Object.assign(wrongOpt,options);
        wrongOpt.headers = null;
        expect.assertions(2);
        let res = await fetch(examEndpoint + "/1", wrongOpt);
        let jsonRes = await res.json();
        expect(res.status).toBe(401);
        expect(jsonRes).toEqual(errors.INVALID_TOKEN);
    });

    test("Failed -> 401 (Unauthorized) :: User not owner", async () => {
        expect.assertions(2);
        let res = await fetch(examEndpoint + "/3", options);
        let jsonRes = await res.json();
        expect(res.status).toBe(401);
        expect(jsonRes).toEqual(errors.ACCESS_NOT_GRANTED);
    });

    test("Failed -> 404 (Not found)", async () => {
        expect.assertions(2);
        let res = await fetch(examEndpoint + "/123", options);
        let jsonRes = await res.json();
        expect(res.status).toBe(404);
        expect(jsonRes).toEqual(errors.ENTITY_NOT_FOUND);
        
    });
})



//classe di test par la post user
describe('PUT /Exams/:examId', () => {
    let myHeader = {};
    beforeAll(() => {
        Object.assign(myHeader,{"Content-Type":"application/json"},header);
    })
    test("Success -> 204 (OK)", async () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'PUT',
            body: JSON.stringify(exams[0]),
            headers: myHeader
        }
        
        expect.assertions(1); //mi aspetto 2 expect, return importante se no salta, => indica la callback
        let res = await fetch(examEndpoint + "/0", options);
        expect(res.status).toBe(204);
    });

    test('Failed -> 400 (Bad request) :: wrong body data', async () => {

        let options = {
            method: 'PUT',
            body: JSON.stringify(new Exam(213, 
                321, 
                "analisi", 
                32.3 ,
                '2019-10-05T14:48:00.000Z'  , 
                '2019-10-05T14:48:00.000Z', undefined, 43,[])),
            headers: myHeader
        }

        expect.assertions(2); //mi aspetto 2 expect, return importante se no salta, => indica la callback
        let res = await fetch(examEndpoint + "/0", options);
        let jsonRes = await res.json();
        expect(res.status).toBe(400);
        expect(jsonRes).toEqual(errors.PARAMS_UNDEFINED);

    });
    test('Failed -> 400 (Bad request) :: wrong body data',async () => {
        
        let options = {
            method: 'PUT',
            body: JSON.stringify(new Exam(213, 
                321, 
                "analisi",
                32.3 ,
                '2019-10-05T14:48:00.000Z'  , 
                '2019-10-05T14:48:00.000Z' ,
                43,undefined,[])),
            headers: myHeader
        }

        expect.assertions(2); 
        let res = await fetch(examEndpoint + "/0", options);
        let jsonRes = await res.json();
        expect(res.status).toBe(400);
        expect(jsonRes).toEqual(errors.PARAMS_UNDEFINED);
    });
    test('Failed -> 400 (Bad request) :: wrong body data', async () => {

        let options = {
            method: 'PUT',
            body: JSON.stringify(new Exam(213, 321, "analisi", 32.3 ,'2019-10-05T14:48:00.000Z'  , undefined , 324, 43, [])),
            headers: myHeader
        }

        expect.assertions(2); 
        let res = await fetch(examEndpoint + "/0", options);
        let jsonRes = await res.json();
        expect(res.status).toBe(400);
        expect(jsonRes).toEqual(errors.PARAMS_UNDEFINED);
    });
    test('Failed -> 400 (Bad request) :: wrong body data', async () => {

        let options = {
            method: 'PUT',
            body: JSON.stringify(new Exam(213, 321, "analisi", 32.3 ,undefined , '2019-10-05T14:48:00.000Z' , 345, 43, [])),
            headers: myHeader
        }

        expect.assertions(2); 
        let res = await fetch(examEndpoint + "/0", options);
        let jsonRes = await res.json();
        expect(res.status).toBe(400);
        expect(jsonRes).toEqual(errors.PARAMS_UNDEFINED);
    });
    test('Failed -> 400 (Bad request) :: wrong body data', async () => {
        let options = {
            method: 'PUT',
            body: JSON.stringify(new Exam(213, 321, "analisi", undefined ,'2019-10-05T14:48:00.000Z'  , '2019-10-05T14:48:00.000Z' , 543, 43, [])),
            headers: myHeader
        }

        expect.assertions(2);
        let res = await fetch(examEndpoint + "/0", options);
        let jsonRes = await res.json();
        expect(res.status).toBe(400);
        expect(jsonRes).toEqual(errors.PARAMS_UNDEFINED);
    });
    test('Failed -> 400 (Bad request) :: wrong body data', async () => {
        let options = {
            method: 'PUT',
            body: JSON.stringify(new Exam(213, 321, undefined, 32.3 ,'2019-10-05T14:48:00.000Z'  , '2019-10-05T14:48:00.000Z' , 54, 43, [])),
            headers: myHeader
        }

        expect.assertions(2); 
        let res = await fetch(examEndpoint + "/0", options);
        let jsonRes = await res.json();
        expect(res.status).toBe(400);
        expect(jsonRes).toEqual(errors.PARAMS_UNDEFINED);
    });
    test('Failed -> 400 (Bad request) :: wrong body data', async () => {
        let options = {
            method: 'PUT',
            body: JSON.stringify(new Exam(213, undefined, "analisi", 32.3 ,'2019-10-05T14:48:00.000Z'  , '2019-10-05T14:48:00.000Z' , 54, 43, [])),
            headers: myHeader
        }

        expect.assertions(2);
        let res = await fetch(examEndpoint + "/0", options);
        let jsonRes = await res.json();
        expect(res.status).toBe(400);
        expect(jsonRes).toEqual(errors.PARAMS_UNDEFINED);
    });
    test('Failed -> 400 (Bad request) :: wrong body data', async () => {
        let options = {
            method: 'PUT',
            body: JSON.stringify(new Exam(undefined, 321, "analisi", 32.3 ,'2019-10-05T14:48:00.000Z'  , '2019-10-05T14:48:00.000Z' , 54, 43, [])),
            headers: myHeader
        }

        expect.assertions(2);
        let res = await fetch(examEndpoint + "/0", options);
        let jsonRes = await res.json();
        expect(res.status).toBe(400);
        expect(jsonRes).toEqual(errors.PARAMS_UNDEFINED);
    });

    test("Failed -> 401 (Unauthorized)", async () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'PUT',
            body: JSON.stringify(exams[0]),
        }
        
        expect.assertions(2);
        let res = await fetch(examEndpoint + "/0", options);
        let jsonRes = await res.json();
        expect(res.status).toBe(401);
        expect(jsonRes).toEqual(errors.INVALID_TOKEN);
    });

    test("Success -> 401 (Unauthorized) :: Not owner", async () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'PUT',
            body: JSON.stringify(exams[0]),
            headers: myHeader
        }
        
        expect.assertions(2);
        let res = await fetch(examEndpoint + "/3", options);
        let jsonRes = await res.json();
        expect(res.status).toBe(401);
        expect(jsonRes).toEqual(errors.ACCESS_NOT_GRANTED);
    });

    test("Failed -> 404 (Not found)", async () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'PUT',
            body: JSON.stringify(exams[0]),
            headers: myHeader
        }
        
        expect.assertions(2); 
        let res = await fetch(examEndpoint + "/123", options);
        let jsonRes = await res.json();
        expect(res.status).toBe(404);
        expect(jsonRes).toEqual(errors.ENTITY_NOT_FOUND);
    });


});
