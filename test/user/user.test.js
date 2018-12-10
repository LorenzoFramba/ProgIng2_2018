const fetch = require("node-fetch");
let User = require("../../model/user");
const errors = require('../../api/errorMsg');
const utils = require('../utility');

let users = Array();
let USER_ENDPOINT = utils.createUrl('Users');
const userData = {
	email : "gino@pino.it",
	password : "ciccio"
}
let header;

//inizializzo i casi di test
beforeAll(async () => {
    users.push(new User(null, "Gino", "Pino", "gino@pino.it", "ciccio", []));


    token = await utils.getToken(userData.email, userData.password);
    header = {
        'Authorization': `Bearer ${token}`
    };

    jest.setTimeout(100000); //evito che le richieste vadano in timeout troppo presto (mi serve per debug)
})

describe('test stupido', () => {
    test("shuold true", () => {
        expect(1).toBe(1);
    })
})

//classe di test par la post user
describe('create user', () => {
    test("should create user", async () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'POST',
            body: JSON.stringify(users[0]),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(1); //mi aspetto 2 expect, return importante se no salta, => indica la callback
        let res = await fetch(USER_ENDPOINT, options);
        expect(res.status).toBe(204);

    });

    test("wrong body data, should return 400", async () => {
        let options = {
            method: 'POST',
            body: "wrong data"
        }

        expect.assertions(2);
        let res = await fetch(USER_ENDPOINT, options)
        let jsonRes = await res.json();
        expect(res.status).toBe(400);
        expect(jsonRes).toEqual(errors.PARAMS_UNDEFINED);


    });


    test("wrong user data, should return 400", async () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new User(123, "bo", undefined, undefined, undefined, undefined, undefined)),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(2);
        let res = await fetch(USER_ENDPOINT, options)
        let jsonRes = await res.json();
        expect(res.status).toBe(400);
        expect(jsonRes).toEqual(errors.PARAMS_UNDEFINED);
    });

})
/*
describe("get a user by id", () => {
    test("should return the specified user", () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'POST',
            body: JSON.stringify(users[0]),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(4);
        return fetch(USER_ENDPOINT, options).then(
            res => res.json().then(userReturned => {
                expect(res.status).toBe(201);
                users[0].id = userReturned.id;
                expect(userReturned).toEqual(users[0]);
                options = {
                    method: 'GET'
                }
                return fetch(USER_ENDPOINT + users[0].id, options).then(
                    res2 => res2.json().then(userReturned2 => {
                        expect(userReturned2).toEqual(users[0]);
                        expect(res.status).toBe(201);
                    })
                )
            })
        )
    });

    test("wrong id, should return 400", () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'GET',
        }

        expect.assertions(1);
        return fetch(USER_ENDPOINT + "abcde", options).then(
            res => expect(res.status).toBe(400)
        );   
    });

    test("user not found, should return 404", () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'GET'
        }

        expect.assertions(1);
        return fetch(USER_ENDPOINT+ '12345', options).then(
            res => expect(res.status).toBe(404)
        );   
    });
})

describe("delete a user by id", () => {
    test("should delete the specified user", () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'POST',
            body: JSON.stringify(users[0]),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(2);
        return fetch(USER_ENDPOINT, options).then(
            res => res.json().then(userReturned => {
                expect(res.status).toBe(201);
                let id = userReturned.id;
                options = {
                    method: 'DELETE'
                }
                return fetch(USER_ENDPOINT + id, options).then( res => {
                    expect(res.status).toBe(200);
                })
            })
        )
    });

    test("wrong id, should return 400", () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'DELETE',
        }

        expect.assertions(1);
        return fetch(USER_ENDPOINT + "abcde", options).then(
            res => expect(res.status).toBe(400)
        );   
    });

    test("user not found, should return 404", () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'DELETE'
        }

        expect.assertions(1);
        return fetch(USER_ENDPOINT+ '12345', options).then(
            res => expect(res.status).toBe(404)
        );   
    });
})
*/