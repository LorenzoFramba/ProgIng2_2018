const fetch = require("node-fetch");
const utils = require('../utility');
let Group = require("../../model/group");

const group_data = require("../../mock/data/group_data");
const user_data = require("../../mock/data/user_data");

const groupURL = "http://localhost:3000/v1/Groups";
let token;

var badGroupList, groupAdded;

//--------------- INIZIALIZZAZIONE DEI TEST -----------------------------------------
beforeAll(async () => {

    jest.setTimeout(100000);
    badGroupList = new Array();

    //Prendo il token di autenticazione
    token = await utils.getToken(user_data[0].email, user_data[0].password);

    //Gruppi non validi
    let badG1 = new Group(1, "Nome", [], 14);
    let badG2 = new Group(2, "Nome", "members", user_data[0].id);
    let badG3 = new Group(3, "Nome", [1111,1223], user_data[0].id);
    let badG4 = new Group(4, "nome", 15, user_data[0].id);
    let badG5 = new Group(5, "Nome", [], "owner");
    let badG6 = new Group(6, "Nome", [-15], user_data[0].id);
    let badG7 = new Group(7, "Nome", [], -15);
    let badG8 = new Group(8, 12, [], user_data[0].id);
    badGroupList.push(badG1, badG2, badG3, badG4, badG5, badG6, badG7, badG8);
})

//--------------- TEST POST /Groups per inserimento nuovi gruppi ----------------------------------
describe("Create new groups", () => {
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

    test('01 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[1]),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(groupURL, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

    test('02 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[2]),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(groupURL, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

    test('03 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[3]),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(groupURL, options).then(
            res=> {
                expect(res.status).toBe(400);
            }
        )
    });

    test('04 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[4]),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(groupURL, options).then(
            res =>  {
                expect(res.status).toBe(400);
            }
        )
    });

    test('05 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[5]),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(groupURL, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

    test('06 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[6]),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(groupURL, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

    test('07 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[7]),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(groupURL, options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

    test('08 - Group valid', () => {

        groupAdded = new Group(15112, "Nome1", [], user_data[0].id);

        let options = {
            method: 'POST',
            body: JSON.stringify(groupAdded),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        //expect.assertions(2); //mi aspetto 2 expect, return importante se no salta, => indica la callback
        return fetch(groupURL, options).then(
            res => res.json().then( groupReturned => {
                expect(res.status).toBe(201);
                groupAdded.id = groupReturned.id;
                expect(JSON.stringify(groupReturned)).toEqual(JSON.stringify(groupAdded));
            }))
    });

    test('11 - Token not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[7]),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch(groupURL, options).then(
            res => {
                expect(res.status).toBe(401);
            }
        )
    });
})

//--------------- TEST GET /Groups per inserimento nuovi gruppi ----------------------------------
describe("Get all user groups", () => {
    test('00 - Token not valid', () => {
        let options = {
            method: 'GET',
            //headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(groupURL, options).then(
            res => {
                expect(res.status).toBe(401);
            }
        )
    });

    test('01 - Successful GET', () => {
        let options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        let correctResponse = new Array();
        for(let group of group_data)
            if (group.owner === 0)
                correctResponse.push({id: group.id, name: group.name});
        correctResponse.push({id: groupAdded.id, name: groupAdded.name});

        return fetch(groupURL, options).then(
            res => res.json().then(list => {
                expect(res.status).toBe(200);
                expect(JSON.stringify(list)).toEqual(JSON.stringify(correctResponse));
            }
        ))
    });
})

//--------------- TEST PUT /Groups/id per inserimento nuovi gruppi ----------------------------------
describe("Modify an existing group", () => {
    test('00 - Group not valid', () => {
        let options = {
            method: 'PUT',
            body: JSON.stringify(badGroupList[0]),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(groupURL + "/1", options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

    test('01 - Group not valid', () => {
        let options = {
            method: 'PUT',
            body: JSON.stringify(badGroupList[1]),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(groupURL + "/1", options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

    test('02 - Group not valid', () => {
        let options = {
            method: 'PUT',
            body: JSON.stringify(badGroupList[2]),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(groupURL + "/1", options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

    test('03 - Group not valid', () => {
        let options = {
            method: 'PUT',
            body: JSON.stringify(badGroupList[3]),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(groupURL + "/1", options).then(
            res=> {
                expect(res.status).toBe(400);
            }
        )
    });

    test('04 - Group not valid', () => {
        let options = {
            method: 'PUT',
            body: JSON.stringify(badGroupList[4]),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(groupURL + "/1", options).then(
            res =>  {
                expect(res.status).toBe(400);
            }
        )
    });

    test('05 - Group not valid', () => {
        let options = {
            method: 'PUT',
            body: JSON.stringify(badGroupList[5]),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(groupURL + "/1", options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

    test('06 - Group not valid', () => {
        let options = {
            method: 'PUT',
            body: JSON.stringify(badGroupList[6]),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(groupURL + "/1", options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

    test('07 - Group not valid', () => {
        let options = {
            method: 'PUT',
            body: JSON.stringify(badGroupList[7]),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(groupURL + "/1", options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

    test('08 - Group valid', () => {

        //groupAdded = new Group(15112, "Nome1", [], user_data[0].id);
        let groupMod = groupAdded;
        groupMod.name = "NOME_MODIFICATO";

        let options = {
            method: 'PUT',
            body: JSON.stringify(groupMod),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        return fetch(groupURL + "/1", options).then(
            res => res.json().then( groupReturned => {
                expect(res.status).toBe(200);
                expect(JSON.stringify(groupReturned)).toEqual(JSON.stringify(groupMod));
            }))
    });

    test('11 - Token not valid', () => {
        let options = {
            method: 'PUT',
            body: JSON.stringify(badGroupList[7]),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch(groupURL + "/1", options).then(
            res => {
                expect(res.status).toBe(401);
            }
        )
    });
})