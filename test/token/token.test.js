const fetch = require("node-fetch");

const tokenURL = "http://localhost:3000/v1/Token";
const userURL = "http://localhost:3000/v1/Users";

const User = require("../../model/user");

var mail, pass;

beforeAll(async () => {

    jest.setTimeout(100000);

    //Inserisco un utente di prova
    mail = "mmmail@test.it";
    pass = "testtt";
    let newUser = new User(99999, "nameTest", "lastnameTest", mail, pass, []);
    let options = {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { 'Content-Type': 'application/json' }
    }

    await fetch(userURL, options);
});

describe("Retrieve token", () => {
    test('00 - Mail not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify({email: "adfasydasj", password: pass}),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch(tokenURL, options).then(
            res => {
                expect(res.status).toBe(401);
            }
        )
    });

    test('01 - Password not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify({email: mail, password: "dnjsbcs___dhhjneed"}),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch(tokenURL, options).then(
            res => {
                expect(res.status).toBe(401);
            }
        )
    });

    test('02 - Empty body', () => {
        let options = {
            method: 'POST',
            //body: JSON.stringify({email: mail, password: "dnjsbcs___dhhjneed"}),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch(tokenURL, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

    test('03 - Mail not specified', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify({password: "dnjsbcs___dhhjneed"}),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch(tokenURL, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

    test('04 - Password not specified', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify({email: mail}),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch(tokenURL, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

    test('05 - Good request', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify({email: mail, password: pass}),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch(tokenURL, options).then(
            res => {
                expect(res.status).toBe(200);
            }
        )
    });
})