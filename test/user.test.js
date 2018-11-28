const fetch = require("node-fetch");
let User = require("../model/user");

let users = Array();

beforeAll(() => {
    users.push(new User(123, "Gino", "Pino", "ginopino", "gino@pino.it", "ciccio", []));
    jest.setTimeout(10000);
})

describe('create user', () => {
    test("should create user", () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(users[0]),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(2);
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

        expect.assertions(1);
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