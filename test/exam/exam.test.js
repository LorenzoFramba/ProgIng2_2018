const fetch = require("node-fetch");
let Exam = require("../../model/exam.js");
const errors = require('../../api/errorMsg');
const utils = require('../utility');

let exams = Array();
let examEndpoint = utils.createUrl('Exams');
let header;
let token;
let tokenToDel;
const examURL = "http://localhost:3000/v1/Exams";

const userData = {
	email : "gino@pino.it",
	password : "ciccio"
}


//inizializzo i casi di test
beforeAll(async () => {

    exams.push(new Exam(123, 321, "analisi", 32.3 ,'2019-10-05T14:48:00.000Z' , '2019-10-05T14:48:00.000Z',[], 4345, 43));
    
    token = await utils.getToken(userData.email, userData.password);
    header = {
        'Authorization': `Bearer ${token}`
    };


    jest.setTimeout(100000); //evito che le richieste vadano in timeout troppo presto
});


//classe di test par la post user
describe('POST /Exams', () => {
    test("Success -> 204 (OK)", async () => {
        //opzioni da mettere nella richiesta
        let myHeader = {};
        Object.assign(myHeader,{"Content-Type":"application/json"},header);

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

        let myHeader = {};
        Object.assign(myHeader,{"Content-Type":"application/json"},header);

        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(213, 
                321, 
                "analisi", 
                32.3 ,
                '2019-10-05T14:48:00.000Z'  , 
                '2019-10-05T14:48:00.000Z', undefined, 43)),
            headers: myHeader
        }

        return fetch(examURL, options).then(
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
                43)),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(examURL, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });
    test('Failed -> 400 (Bad request) :: wrong body data', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(213, 321, "analisi", 32.3 ,'2019-10-05T14:48:00.000Z'  , undefined ,[], 324, 43)),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(examURL, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });
    test('Failed -> 400 (Bad request) :: wrong body data', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(213, 321, "analisi", 32.3 ,undefined , '2019-10-05T14:48:00.000Z' , 345, 43)),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(examURL, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });
    test('Failed -> 400 (Bad request) :: wrong body data', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(213, 321, "analisi", undefined ,'2019-10-05T14:48:00.000Z'  , '2019-10-05T14:48:00.000Z' , 543, 43)),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(examURL, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });
    test('Failed -> 400 (Bad request) :: wrong body data', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(213, 321, undefined, 32.3 ,'2019-10-05T14:48:00.000Z'  , '2019-10-05T14:48:00.000Z' , 54, 43)),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(examURL, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });
    test('Failed -> 400 (Bad request) :: wrong body data', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(213, undefined, "analisi", 32.3 ,'2019-10-05T14:48:00.000Z'  , '2019-10-05T14:48:00.000Z' , 54, 43)),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(examURL, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });
    test('Failed -> 400 (Bad request) :: wrong body data', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(undefined, 321, "analisi", 32.3 ,'2019-10-05T14:48:00.000Z'  , '2019-10-05T14:48:00.000Z' , 54, 43)),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(examURL, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

});


describe("GET /Exam", () => {
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
                'countTask': 10
            }
        
        expect.assertions(2);
        let result = await fetch(examEndpoint + "/0", options);
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

/*
//DELETE

test("should delete the specified exam", () => {
    //opzioni da mettere nella richiesta
    let options = {
        method: 'POST',
        body: JSON.stringify(exams[0]),
        headers: { 'Content-Type': 'application/json' }
    }

    expect.assertions(4);

    return fetch(examURL, options).then(
        res => res.json().then(examReturned => {
            expect(res.status).toBe(201);
           let idDelete = examReturned.id;
            options = {
                method: 'DELETE'
            }
            return fetch(examURL + idDelete, options).then(
                res2 => {expect(res2.status).toBe(200);                    
                })
        })
        
    )
});
*/
/*
describe('PUT /Users', () => {
    test("Success -> 204 (OK)", async () => {
        //opzioni da mettere nella richiesta.
        const usrToMod = {
                "name" : "Mario",
                "lastname" : "Rossi",
                "email" : "mario@ross.it",
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
        let res = await fetch(examEndpoint, options);
        expect(res.status).toBe(204);

    });
    
    test("Failed -> 400 (Bad request) :: wrong body data", async () => {
        let options = {
            method: 'PUT',
            body: "wrong data",
            headers : header
        }

        expect.assertions(2);
        let res = await fetch(examEndpoint, options)
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
        let res = await fetch(examEndpoint, options)
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
        let res = await fetch(examEndpoint, options)
        let jsonRes = await res.json();
        expect(res.status).toBe(401);
        expect(jsonRes).toEqual(errors.INVALID_TOKEN);

    });

})

*/



/*
    test('00 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[0]),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(groupURL, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });



//classe di test par la post exam
/describe('POST /Exam', () => {
    test("Success -> 200 (OK)", async () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'POST',
            body: JSON.stringify(exams[0]),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(1); 
        let res = await fetch(USER_ENDPOINT, options);
        expect(res.status).toBe(204);

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
        expect.assertions(2);
        let res = await fetch(examEndpoint, options);
        let examReturned = await res.json();
        expect(res.status).toBe(200);
        exams[0].id = examReturned.id;
        expect(examReturned).toEqual(exams[0]);
    });

    test("Failed -> 401 (Unauthorized) :: Token not valid", async () => {
        //opzioni da mettere nella richiesta
        let optionsWrong = {
            method: 'GET'
        }

        expect.assertions(2);
        let res = await fetch(examEndpoint, optionsWrong);
        let jsonRes = await res.json();
        expect(res.status).toBe(401);
        expect(jsonRes).toEqual(errors.INVALID_TOKEN);
        
    });
});



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
        let res = await fetch(examEndpoint, options);
        expect(res.status).toBe(204);
    });
    
    test("Failed -> 401 (Unauthorized) :: Token not valid", async () => {
        //opzioni da mettere nella richiesta
        let optionsWrong = {
            method: 'DELETE'
        }

        expect.assertions(2);
        let res = await fetch(examEndpoint, optionsWrong);
        let jsonRes = await res.json();
        expect(res.status).toBe(401);
        expect(jsonRes).toEqual(errors.INVALID_TOKEN);
    });
    
})



describe('delete exam by id', () => {
    test("should delete the specified exam", () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'POST',
            body: JSON.stringify(exams[0]),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(4);

        return fetch('http://localhost:3000/exam', options).then(
            res => res.json().then(examReturned => {
                expect(res.status).toBe(201);
               let idDelete = examReturned.id;
                options = {
                    method: 'DELETE'
                }
                return fetch('http://localhost:3000/exam/' + idDelete, options).then(
                    res2 => {expect(res2.status).toBe(200);                    
                    })
            })
            
        )
    });


}); */