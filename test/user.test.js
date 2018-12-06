const fetch = require("node-fetch");
let User = require("../model/user");

let users = Array();
const USER_ENDPOINT = "http://localhost:3000/Users/";
//inizializzo i casi di test
beforeAll(() => {
    users.push(new User(123, "Gino", "Pino", "ginopino", "gino@pino.it", "ciccio", []));
    jest.setTimeout(100000); //evito che le richieste vadano in timeout troppo presto (mi serve per debug)
})

//classe di test par la post user
describe('create user', () => {
    test("should create user", () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'POST',
            body: JSON.stringify(users[0]),
            headers: { 'Content-Type': 'application/json' }
        }
        
        expect.assertions(2); //mi aspetto 2 expect, return importante se no salta, => indica la callback
        return fetch(USER_ENDPOINT, options).then(
            res => res.json().then(userReturned => {
                expect(res.status).toBe(201);
                users[0].id = userReturned.id;
                expect(userReturned).toEqual(users[0]);
            })
        )
    });

    test("wrong body data, should return 400", () => {
        let options = {
            method: 'POST',
            body: "wrong data"
        }

        expect.assertions(1); //mi aspetto 1 expect, il return è importante se no mi salta
        return fetch(USER_ENDPOINT, options).then(
            res => {
                expect(res.status).toBe(400);
            })
    });


    test("wrong user data, should return 400", () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new User(123, "bo", undefined, undefined, undefined, undefined, undefined)),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(1);
        return fetch(USER_ENDPOINT, options).then(
            res => {
                expect(res.status).toBe(400);
            })
    });

})

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