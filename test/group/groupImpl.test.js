const insertGroup = require("../../api/impl/groupImpl").insertNewGroup;
const checkMember = require("../../api/impl/groupImpl").checkMember;
const retrieveAllGroups = require("../../api/impl/groupImpl").retrieveAllGroups;

const user_data = require("../../mock/data/user_data");
const group_data = require("../../mock/data/group_data");

let User = require("../../model/user");
const fetch = require("node-fetch");

let usersList = new Array();
let usr1, usr2, usr3, usr4;

//--------------- INIZIALIZZAZIONE DEI TEST -----------------------------------------
beforeAll(() => {
    jest.setTimeout(10000);
})

//--------------- TEST insertGroup(name, members, owner) ----------------------------------
describe("Insert new group", () => {
    test('name is not defined', () => {
        let name = undefined
        let members = []
        let owner   = usr1.id
        expect(insertGroup(name, members, owner)).toBeNull();
    });

    test('members is not defined', () => {
        let name = "Marco"
        let members = undefined
        let owner = usr1.id
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
        let owner = usr1.id
        expect(insertGroup(name, members, owner)).toBeNull();
    });

    test('name is an array of int', () => {
        let name = [12, 12]
        let members = []
        let owner = usr1.id
        expect(insertGroup(name, members, owner)).toBeNull();
    });

    test('members is a string', () => {
        let name = "Marco"
        let members = "Ccc"
        let owner = usr1.id
        expect(insertGroup(name, members, owner)).toBeNull();
    });

    test('members is an array of string', () => {
        let name = "Marco"
        let members = ["Ccc", "Abb"]
        let owner = usr1.id
        expect(insertGroup(name, members, owner)).toBeNull();
    });

    test('members is an array of negative numbers', () => {
        let name = "Marco"
        let members = [-12, -12]
        let owner = usr1.id
        expect(insertGroup(name, members, owner)).toBeNull();
    });

    test('members is an array of non-members', () => {
        let name = "Marco"
        let members = [111111,222222]
        let owner = usr1.id
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
        let owner = usr1.id
        expect(insertGroup(name, members, owner)).not.toBeNull();
    });

    test('Correct group 2', () => {
        let name = "Matteo"
        let members = [usr2.id, usr3.id]
        let owner = usr1.id
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

//--------------- TEST retrieveAllGroups(idUser) ----------------------------------
describe("Retrieve all groups", () => {
    test('idUser is a string', () => {
        expect(retrieveAllGroups("ciao")).toBeNull;
    });

    test('Call function with 2 parameters', () => {
        expect(retrieveAllGroups("ciao", 23)).toBeNull;
    });

    test('call function with 0 parameters', () => {
        expect(retrieveAllGroups()).toBeNull;
    });

    test('idUser is not a real user', () => {
        expect(retrieveAllGroups(12321121)).toBeNull;
    });

    test('idUser is a negative number', () => {
        expect(retrieveAllGroups(-151)).toBeNull;
    });

    test('idUser is a real user', () => {
        expect(retrieveAllGroups(group_data[0].owner)).toEqual(group_data[0]);
    });
})