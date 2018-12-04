const fetch = require("node-fetch");
let User = require("../model/user");
let Group = require("../model/group");

let goodGroupsList = new Array();
let badGroupList = new Array();
let usersList = new Array();

//--------------- INIZIALIZZAZIONE DEI TEST -----------------------------------------
beforeAll(() => {

    jest.setTimeout(10000);

    //Inserisco un po' di utenti nel sistema
    let usr1 = new User(1, "U1", "L1", "USRN1", "M1", "P1", []);
    let usr2 = new User(2, "U2", "L2", "USRN2", "M2", "P2", []);
    let usr3 = new User(3, "U3", "L3", "USRN3", "M3", "P3", []);
    let usr4 = new User(4, "U4", "L4", "USRN4", "M4", "P4", []);
    usersList.push(usr1, usr2, usr3, usr4);

    for (var i=0; i<usersList.length; i++) {
        let options = {
            method: 'POST',
            body: JSON.stringify(usersList[i]),
            headers: {'Content-Type': 'application/json'}
        }

        fetch('http://localhost:3000/user', options).then(
            res => res.json().then(userReturned => {
                if (userReturned !== undefined && userReturned !== null)
                    usersList[i].id = userReturned.id;
            })
        )
    }

    //Gruppi non validi
    let badG1 = new Group(1, "Nome", [], 14);
    let badG2 = new Group(2, "Nome", "members", usersList[0].id);
    let badG3 = new Group(3, "Nome", [1111,1223], usersList[0].id);
    let badG4 = new Group(4, "nome", 15, usersList[0].id);
    let badG5 = new Group(5, "Nome", [], "owner");
    let badG6 = new Group(6, "Nome", [-15], usersList[0].id);
    let badG7 = new Group(7, "Nome", [], -15);
    let badG8 = new Group(8, 12, [], usersList[0].id);
    badGroupList.push(badG1, badG2, badG3, badG4, badG5, badG6, badG7, badG8);

    //Gruppi validi
    let goodG1 = new Group(1,"Nome", [], usersList[0].id);
    let goodG2 = new Group(2, "Nome", [usersList[1].id, usersList[2].id], usersList[0].id);
    let goodG3 = new Group(3, "Nomes", [usersList[1].id], usersList[1].id);
    goodGroupsList.push(goodG1, goodG2, goodG3);

})

//--------------- TEST POST /group per inserimento nuovi gruppi ----------------------------------
describe("Create new groups", () => {
    test('0 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[0]),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch('http://localhost:3000/group', options).then(
            res => res.json().then(groupReturned => {
                expect(res.status).toBe(400);
            })
        )
    });

    test('1 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[1]),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch('http://localhost:3000/group', options).then(
            res => res.json().then(groupReturned => {
                expect(res.status).toBe(400);
            })
        )
    });

    test('2 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[2]),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch('http://localhost:3000/group', options).then(
            res => res.json().then(groupReturned => {
                expect(res.status).toBe(400);
            })
        )
    });

    test('3 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[3]),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch('http://localhost:3000/group', options).then(
            res => res.json().then(groupReturned => {
                expect(res.status).toBe(400);
            })
        )
    });

    test('4 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[4]),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch('http://localhost:3000/group', options).then(
            res => res.json().then(groupReturned => {
                expect(res.status).toBe(400);
            })
        )
    });

    test('5 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[5]),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch('http://localhost:3000/group', options).then(
            res => res.json().then(groupReturned => {
                expect(res.status).toBe(400);
            })
        )
    });

    test('6 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[6]),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch('http://localhost:3000/group', options).then(
            res => res.json().then(groupReturned => {
                expect(res.status).toBe(400);
            })
        )
    });

    test('7 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[7]),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch('http://localhost:3000/group', options).then(
            res => res.json().then(groupReturned => {
                expect(res.status).toBe(400);
            })
        )
    });

    test('8 - Group valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(goodGroupList[0]),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(2); //mi aspetto 2 expect, return importante se no salta, => indica la callback
        return fetch('http://localhost:3000/group', options).then(
            res => res.json().then(groupReturned => {
                expect(res.status).toBe(201);
                goodGroupsList[0].id = groupReturned.id;
                expect(groupReturned).toEqual(goodGroupsList[0]);
            })
        )
    });

    test('9 - Group valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(goodGroupList[1]),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(2); //mi aspetto 2 expect, return importante se no salta, => indica la callback
        return fetch('http://localhost:3000/group', options).then(
            res => res.json().then(groupReturned => {
                expect(res.status).toBe(201);
                goodGroupsList[0].id = groupReturned.id;
                expect(groupReturned).toEqual(goodGroupsList[0]);
            })
        )
    });

    test('10 - Group valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(goodGroupList[2]),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(2); //mi aspetto 2 expect, return importante se no salta, => indica la callback
        return fetch('http://localhost:3000/group', options).then(
            res => res.json().then(groupReturned => {
                expect(res.status).toBe(201);
                goodGroupsList[0].id = groupReturned.id;
                expect(groupReturned).toEqual(goodGroupsList[0]);
            })
        )
    });
})