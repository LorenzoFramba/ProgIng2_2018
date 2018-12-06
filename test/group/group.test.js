const fetch = require("node-fetch");
let User = require("../../model/user");
let Group = require("../../model/group");

var goodGroupList;
var badGroupList;
var usersList;

//--------------- INIZIALIZZAZIONE DEI TEST -----------------------------------------
beforeAll(() => {

    jest.setTimeout(10000);

    usersList = new Array();
    badGroupList = new Array();
    goodGroupList = new Array();

    //Inserisco un po' di utenti nel sistema
    let usr1 = new User(1, "U1", "L1", "USRN1", "M1", "P1", []);
    let usr2 = new User(2, "U2", "L2", "USRN2", "M2", "P2", []);
    let usr3 = new User(3, "U3", "L3", "USRN3", "M3", "P3", []);
    let usr4 = new User(4, "U4", "L4", "USRN4", "M4", "P4", []);
    usersList.push(usr1, usr2, usr3, usr4);

    let opt1 = { method : "POST", body : JSON.stringify(usr1), headers : {'Content-Type': 'application/json'}};
    let opt2 = { method : "POST", body : JSON.stringify(usr2), headers : {'Content-Type': 'application/json'}};
    let opt3 = { method : "POST", body : JSON.stringify(usr3), headers : {'Content-Type': 'application/json'}};
    let opt4 = { method : "POST", body : JSON.stringify(usr4), headers : {'Content-Type': 'application/json'}};

    let p1 = new Promise(() => {
       return fetch('http://localhost:3000/user', opt1).then(
           userReturned => userReturned.json().then(
               res => {
                   if (res !== undefined && res !== null)
                       usr1.id = res.id;
               }))
    });
    let p2 = new Promise(() => {
        return fetch('http://localhost:3000/user', opt2).then(
            userReturned => userReturned.json().then(
                res => {
                    if (res !== undefined && res !== null)
                        usr2.id = res.id;
                }))
    });
    let p3 = new Promise(() => {
        return fetch('http://localhost:3000/user', opt3).then(
            userReturned => userReturned.json().then(
                res => {
                    if (res !== undefined && res !== null)
                        usr3.id = res.id;
                }))
    });
    let p4 = new Promise(() => {
        return fetch('http://localhost:3000/user', opt4).then(
            userReturned => userReturned.json().then(
                res => {
                    if (res !== undefined && res !== null)
                        usr4.id = res.id;
                }))
    });

    Promise.all([p1, p2, p3, p4]).then(
        values => { console.log(values) }
    );

    /*var p3 = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, "foo");
    });

    for (var i=0; i<usersList.length; i++) {
        let options = {
            method: 'POST',
            body: JSON.stringify(usersList[i]),
            headers: {'Content-Type': 'application/json'}
        }

        let index = i;

        fetch('http://localhost:3000/user', options).then(
            userReturned => userReturned.json().then(
                res => {
                    if (res !== undefined && res !== null)
                        usersList[index].id = res.id;
                }
            )
        );
    }*/

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
    goodGroupList.push(goodG1, goodG2, goodG3);

})

//--------------- TEST POST /group per inserimento nuovi gruppi ----------------------------------
describe("Create new groups", () => {
    test('00 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[0]),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch('http://localhost:3000/groups', options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

    test('01 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[1]),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch('http://localhost:3000/groups', options).then(
            res => res.json().then(groupReturned => {
                expect(res.status).toBe(400);
            })
        )
    });

    test('02 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[2]),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch('http://localhost:3000/groups', options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

    test('03 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[3]),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch('http://localhost:3000/groups', options).then(
            res=> {
                expect(res.status).toBe(400);
            }
        )
    });

    test('04 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[4]),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch('http://localhost:3000/groups', options).then(
            res =>  {
                expect(res.status).toBe(400);
            }
        )
    });

    test('05 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[5]),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch('http://localhost:3000/groups', options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

    test('06 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[6]),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch('http://localhost:3000/groups', options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

    test('07 - Group not valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(badGroupList[7]),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch('http://localhost:3000/groups', options).then(
            res => {
                expect(res.status).toBe(400);
            }
        )
    });

    test('08 - Group valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(goodGroupList[0]),
            headers: { 'Content-Type': 'application/json' }
        }


        return fetch('http://localhost:3000/groups', options).then(
            res => res.json().then(groupReturned => {
                expect(res.status).toBe(201);
                goodGroupsList[0].id = groupReturned.id;
                expect(groupReturned).toEqual(goodGroupsList[0]);

                expect.assertions(2); //mi aspetto 2 expect, return importante se no salta, => indica la callback
            })
        )

        
    });

    test('09 - Group valid', () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(goodGroupList[1]),
            headers: { 'Content-Type': 'application/json' }
        }

        //expect.assertions(2); //mi aspetto 2 expect, return importante se no salta, => indica la callback
        return fetch('http://localhost:3000/groups', options).then(
            res => res.json().then(groupReturned => {
                expect(res.status).toBe(201);
                goodGroupsList[1].id = groupReturned.id;
                expect(groupReturned).toEqual(goodGroupsList[1]);
                expect.assertions(2); //mi aspetto 2 expect, return importante se no salta, => indica la callback
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
        return fetch('http://localhost:3000/groups', options).then(
            res => res.json().then(groupReturned => {
                expect(res.status).toBe(201);
                goodGroupsList[2].id = groupReturned.id;
                expect(groupReturned).toEqual(goodGroupsList[2]);
                //expect.assertions(2); //mi aspetto 2 expect, return importante se no salta, => indica la callback
            })
        )
    });
})