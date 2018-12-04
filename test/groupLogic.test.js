const insertGroup = require("../logic/groupLogic").insertNewGroup;
const checkMember = require("../logic/groupLogic").checkMember;
let User = require("../model/user");
const fetch = require("node-fetch");

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

    //Inserisco gli utenti tramite l'API e prendo il loro id
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
})

//--------------- TEST insertGroup(name, members, owner) ----------------------------------
describe("Insert new group", () => {
    test('name is not defined', () => {
        let name = undefined
        let members = []
        let owner   = usersList[0].id
        expect(insertGroup(name, members, owner)).toBeNull();
    });

    test('members is not defined', () => {
        let name = "Marco"
        let members = undefined
        let owner = usersList[0].id
        expect(insertGroup(name, members, owner)).toBeNull();
    });

    test('owner is not defined', () => {
        let name = "Marco"
        let members = []
        let owner = undefined
        expect(insertGroup(name, members, owner)).toBeNull();
    });

    test('name is a number', () => {
        let name = 12
        let members = []
        let owner = usersList[0].id
        expect(insertGroup(name, members, owner)).toBeNull();
    });

    test('name is an array of int', () => {
        let name = [12, 12]
        let members = []
        let owner = usersList[0].id
        expect(insertGroup(name, members, owner)).toBeNull();
    });

    test('members is a string', () => {
        let name = "Marco"
        let members = "Ccc"
        let owner = usersList[0].id
        expect(insertGroup(name, members, owner)).toBeNull();
    });

    test('members is an array of string', () => {
        let name = "Marco"
        let members = ["Ccc", "Abb"]
        let owner = usersList[0].id
        expect(insertGroup(name, members, owner)).toBeNull();
    });

    test('members is an array of negative numbers', () => {
        let name = "Marco"
        let members = [-12, -12]
        let owner = usersList[0].id
        expect(insertGroup(name, members, owner)).toBeNull();
    });

    test('members is an array of non-members', () => {
        let name = "Marco"
        let members = [111111,222222]
        let owner = usersList[0].id
        expect(insertGroup(name, members, owner)).toBeNull();
    });

    test('owner is a string', () => {
        let name = "Marco"
        let members = []
        let owner = "Matteo"
        expect(insertGroup(name, members, owner)).toBeNull();
    });

    test('owner is a negative number', () => {
        let name = "Marco"
        let members = []
        let owner = -15
        expect(insertGroup(name, members, owner)).toBeNull();
    });

    test('owner is a non-member', () => {
        let name = "Marco"
        let members = []
        let owner = 111111
        expect(insertGroup(name, members, owner)).toBeNull();
    });

    test('Correct group 1', () => {
        let name = "Marco"
        let members = []
        let owner = usersList[0].id
        expect(insertGroup(name, members, owner)).not.toBeNull();
    });

    test('Correct group 2', () => {
        let name = "Matteo"
        let members = [usersList[1].id, usersList[2].id]
        let owner = usersList[0].id
        expect(insertGroup(name, members, owner)).not.toBeNull();
    });
})


//--------------- TEST isMember(idMember) ----------------------------------
describe("Check members", () => {
    test('member is undefined', () => {
        let member = undefined
        expect(checkMember(member)).toBeFalsy;
    });

    test('member is a string', () => {
        let member = "Matteo"
        expect(checkMember(member)).toBeFalsy;
    });

    test('member is an array', () => {
        let member = []
        expect(checkMember(member)).toBeFalsy;
    });

    test('member is not a real member', () => {
        let member = 111
        expect(checkMember(member)).toBeFalsy;
    });

    test('member is a real member', () => {
        let member = usersList[0].id
        expect(checkMember(member)).toBeFalsy;
    });
})