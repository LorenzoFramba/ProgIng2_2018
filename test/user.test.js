const fetch = require("node-fetch");
let User = require("../model/user");

let users = Array();
//inizializzo i casi di test
beforeAll(() => {
    users.push(new User(123, "Gino", "Pino", "ginopino", "gino@pino.it", "ciccio", []));
    jest.setTimeout(10000); //evito che le richieste vadano in timeout troppo presto (mi serve per debug)
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
        return fetch('http://localhost:3000/user', options).then(
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
            body: "wrong data",
            headers: { 'Content-Type': 'application/json' }
        }
        
        expect.assertions(1); //mi aspetto 1 expect, il return è importante se no mi salta
        return fetch('http://localhost:3000/user', options).then(
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
        return fetch('http://localhost:3000/user', options).then(
            res => {
                expect(res.status).toBe(400);
            })
    });

})