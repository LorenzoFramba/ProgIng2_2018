const insertGroup = require("../../api/impl/groupImpl").insertNewGroup;
const checkMember = require("../../api/impl/groupImpl").checkMember;
const retrieveAllGroups = require("../../api/impl/groupImpl").retrieveAllGroups;
const checkGroup = require("../../api/impl/groupImpl").checkGroup;
const modifyGroup = require("../../api/impl/groupImpl").modifyGroup;
const getGroupInfo = require("../../api/impl/groupImpl").getGroupInfo;
const deleteGroup = require("../../api/impl/groupImpl").deleteGroup;
const addMembers = require("../../api/impl/groupImpl").addMembers;

const user_data = require("../../mock/data/user_data");
const group_data = require("../../mock/data/group_data");

//--------------- TEST insertGroup(name, members, owner) ----------------------------------
describe("Insert new group", () => {
    test('name is not defined', () => {
        let name = undefined
        let members = []
        let owner   = user_data[0].id
        insertGroup(name, members, owner).then(data => expect(data).toBeNull());
    });

    test('members is not defined', () => {
        let name = "Marco"
        let members = undefined
        let owner = user_data[0].id
        insertGroup(name, members, owner).then(data => expect(data).toBeNull());
    });

    test('owner is not defined', () => {
        let name = "Marco"
        let members = []
        let owner = undefined
        insertGroup(name, members, owner).then(data => expect(data).toBeNull());
    });

    test('name is a number', () => {
        let name = 12
        let members = []
        let owner = user_data[0].id
        insertGroup(name, members, owner).then(data => expect(data).toBeNull());
    });

    test('name is an array of int', () => {
        let name = [12, 12]
        let members = []
        let owner = user_data[0].id
        insertGroup(name, members, owner).then(data => expect(data).toBeNull());
    });

    test('members is a string', () => {
        let name = "Marco"
        let members = "Ccc"
        let owner = user_data[0].id
        insertGroup(name, members, owner).then(data => expect(data).toBeNull());
    });

    test('members is an array of string', () => {
        let name = "Marco"
        let members = ["Ccc", "Abb"]
        let owner = user_data[0].id
        insertGroup(name, members, owner).then(data => expect(data).toBeNull());
    });

    test('members is an array of negative numbers', () => {
        let name = "Marco"
        let members = [-12, -12]
        let owner = user_data[0].id
        insertGroup(name, members, owner).then(data => expect(data).toBeNull());
    });

    test('members is an array of non-members', () => {
        let name = "Marco"
        let members = [111111,222222]
        let owner = user_data[0].id
        insertGroup(name, members, owner).then(data => expect(data).toBeNull());
    });

    test('owner is a string', () => {
        let name = "Marco"
        let members = []
        let owner = "Matteo"
        insertGroup(name, members, owner).then(data => expect(data).toBeNull());
    });

    test('owner is a negative number', () => {
        let name = "Marco"
        let members = []
        let owner = -15
        insertGroup(name, members, owner).then(data => expect(data).toBeNull());
    });

    test('owner is a non-member', () => {
        let name = "Marco"
        let members = []
        let owner = 111111
        insertGroup(name, members, owner).then(data => expect(data).toBeNull());
    });

    test('Correct group 1', () => {
        let name = "Marco"
        let members = []
        let owner = user_data[0].id
        insertGroup(name, members, owner).then(data => expect(data).not.toBeNull());
    });

    test('Correct group 2', () => {
        let name = "Matteo"
        let members = [user_data[2].id, user_data[3].id]
        let owner = user_data[0].id
        insertGroup(name, members, owner).then(data => expect(data).not.toBeNull());
    });
})


//--------------- TEST checkMember(idMember) ----------------------------------
describe("Check members", () => {
    test('call with 0 parameters', () => {
        let member = undefined
        checkMember().then(data => expect(data).toBeFalsy());
    });

    test('call with 2 parameters', () => {
        let member = undefined
        checkMember(member, 23).then(data => expect(data).toBeFalsy());
    });

    test('member is undefined', () => {
        let member = undefined
        checkMember(member).then(data => expect(data).toBeFalsy());
    });

    test('member is a string', () => {
        let member = "Matteo"
        checkMember(member).then(data => expect(data).toBeFalsy());
    });

    test('member is an array', () => {
        let member = []
        checkMember(member).then(data => expect(data).toBeFalsy());
    });

    test('member is not a real member', () => {
        let member = 111
        checkMember(member).then(data => expect(data).toBeFalsy());
    });

    test('member is a real member', () => {
        let member = user_data[0].id
        checkMember(member).then(data => expect(data).toBeTruthy());
    });
})

//--------------- TEST retrieveAllGroups(idUser) ----------------------------------
describe("Retrieve all groups", () => {
    test('idUser is a string', () => {
        retrieveAllGroups("Ciao").then(data => expect(data).toBeNull());
    });

    test('Call function with 2 parameters', () => {
        retrieveAllGroups("Ciao",23).then(data => expect(data).toBeNull());
    });

    test('call function with 0 parameters', () => {
        retrieveAllGroups().then(data => expect(data).toBeNull());
    });

    test('idUser is not a real user', () => {
        retrieveAllGroups(1232111).then(data => expect(data).toBeNull());
    });

    test('idUser is a negative number', () => {
        retrieveAllGroups(-151).then(data => expect(data).toBeNull());
    });

    test('idUser is a real user', () => {
        retrieveAllGroups(group_data[2].owner).then(data => expect(data).toEqual([{id: group_data[2].id, name: group_data[2].name}]));
    });
})

//--------------- TEST checkGroup(idGroup) ----------------------------------
describe("Check groups", () => {
    test('call with 0 parameters', () => {
        let group = undefined;
        checkGroup().then(data => expect(data).toBeFalsy());
    });

    test('call with 2 parameters', () => {
        let group = undefined;
        checkGroup(group, 23).then(data => expect(data).toBeFalsy());
    });

    test('group is undefined', () => {
        let group = undefined;
        checkGroup(group).then(data => expect(data).toBeFalsy());
    });

    test('group is a string', () => {
        let group = "group";
        checkGroup(group).then(data => expect(data).toBeFalsy());
    });

    test('group is an array', () => {
        let group = [];
        checkGroup(group).then(data => expect(data).toBeFalsy());
    });

    test('group is not a real group', () => {
        let group = {id: -15, name: "Ciao", member: [], owner: 15};
        checkGroup(group).then(data => expect(data).toBeFalsy());
    });

    test('group is a real group', () => {
        let group = group_data[0];
        checkGroup(group).then(data => expect(data).toBeTruthy());
    });
})

//--------------- TEST modifyGroup(idUser, idGroup, newGroup) ----------------------------------
describe("Modify an existing group", () => {
    test('call with 0 parameters', () => {
        let idUser = undefined;
        let idGroup = undefined;
        let newGroup = undefined;
        modifyGroup(idUser, idGroup, newGroup).then(data => expect(data).toBeFalsy());
    });

    test('call with 4 parameters', () => {
        let idUser = undefined;
        let idGroup = undefined;
        let newGroup = undefined;
        modifyGroup(idUser, idGroup, newGroup, 23).then(data => expect(data).toBeFalsy());
    });

    test('idUser is undefined', () => {
        let idUser = undefined;
        let idGroup = group_data[0].id;
        let newGroup = group_data[0];
        modifyGroup(idUser, idGroup, newGroup).then(data => expect(data).toBeFalsy());
    });

    test('idGroup is undefined', () => {
        let idUser = user_data[0].id;
        let idGroup = undefined;
        let newGroup = group_data[0];
        modifyGroup(idUser, idGroup, newGroup).then(data => expect(data).toBeFalsy());
    });

    test('newGroup is undefined', () => {
        let idUser = user_data[0].id;
        let idGroup = group_data[0].id;
        let newGroup = undefined;
        modifyGroup(idUser, idGroup, newGroup).then(data => expect(data).toBeFalsy());
    });

    test('idUser is not a number', () => {
        let idUser = "ciao";
        let idGroup = group_data[0].id;
        let newGroup = group_data[0];
        modifyGroup(idUser, idGroup, newGroup).then(data => expect(data).toBeFalsy());
    });

    test('idUser is not a real user', () => {
        let idUser = 9999999;
        let idGroup = group_data[0].id;
        let newGroup = group_data[0];
        modifyGroup(idUser, idGroup, newGroup).then(data => expect(data).toBeFalsy());
    });

    test('idGroup is not a number', () => {
        let idUser = user_data[0].id;
        let idGroup = "ciao";
        let newGroup = group_data[0];
        modifyGroup(idUser, idGroup, newGroup).then(data => expect(data).toBeFalsy());
    });

    test('idGroup is not a real group', () => {
        let idUser = user_data[0].id;
        let idGroup = 9999999;
        let newGroup = group_data[0];
        modifyGroup(idUser, idGroup, newGroup).then(data => expect(data).toBeFalsy());
    });

    test('newGroup.id is undefined', () => {
        let idUser = user_data[0].id;
        let idGroup = group_data[0].id;
        let newGroup = {id: undefined, name: "Ciao", members: [], owner: group_data[0].owner};
        modifyGroup(idUser, idGroup, newGroup).then(data => expect(data).toBeFalsy());
    });

    test('newGroup.name is undefined', () => {
        let idUser = user_data[0].id;
        let idGroup = group_data[0].id;
        let newGroup = {id: group_data[0].id, name: undefined, members: [], owner: group_data[0].owner};
        modifyGroup(idUser, idGroup, newGroup).then(data => expect(data).toBeFalsy());
    });

    test('newGroup.members is undefined', () => {
        let idUser = user_data[0].id;
        let idGroup = group_data[0].id;
        let newGroup = {id: group_data[0].id, name: "Ciao", members: undefined, owner: group_data[0].owner};
        modifyGroup(idUser, idGroup, newGroup).then(data => expect(data).toBeFalsy());
    });

    test('newGroup.owner is undefined', () => {
        let idUser = user_data[0].id;
        let idGroup = group_data[0].id;
        let newGroup = {id: group_data[0].id, name: "Ciao", members: [], owner: undefined};
        modifyGroup(idUser, idGroup, newGroup).then(data => expect(data).toBeFalsy());
    });

    test('idUser != newGroup.owner', () => {
        let idUser = user_data[2].id;
        let idGroup = group_data[0].id;
        let newGroup = {id: group_data[0].id, name: "Ciao", members: [], owner: group_data[0].owner};
        modifyGroup(idUser, idGroup, newGroup).then(data => expect(data).toBeFalsy());
    });

    test('idGroup != newGroup.id', () => {
        let idUser = user_data[0].id;
        let idGroup = group_data[2].id;
        let newGroup = {id: group_data[0].id, name: "Ciao", members: [], owner: group_data[0].owner};
        modifyGroup(idUser, idGroup, newGroup).then(data => expect(data).toBeFalsy());
    });

    test('newGroup.name is not a string', () => {
        let idUser = user_data[0].id;
        let idGroup = group_data[0].id;
        let newGroup = {id: group_data[0].id, name: [], members: [], owner: group_data[0].owner};
        modifyGroup(idUser, idGroup, newGroup).then(data => expect(data).toBeFalsy());
    });

    test('newGroup.members is not an array', () => {
        let idUser = user_data[0].id;
        let idGroup = group_data[0].id;
        let newGroup = {id: group_data[0].id, name: "Ciao", members: "Ciao", owner: group_data[0].owner};
        modifyGroup(idUser, idGroup, newGroup).then(data => expect(data).toBeFalsy());
    });

    test('Correct modify', () => {
        let idUser = group_data[0].owner;
        let idGroup = group_data[0].id;
        let newGroup = {id: group_data[0].id, name: "Ciao", members: [], owner: group_data[0].owner};
        modifyGroup(idUser, idGroup, newGroup).then(data => expect(data).toBeTruthy());
    });
})

//--------------- TEST getGroupInfo(idUser, idGroup) ----------------------------------
describe("Get all info about a group", () => {
    test('call with 0 parameters', () => {
        let idUser = undefined;
        let idGroup = undefined;
        getGroupInfo().then(data => expect(data).toBeNull());
    });

    test('call with 3 parameters', () => {
        let idUser = undefined;
        let idGroup = undefined;
        getGroupInfo(idUser, idGroup, 23).then(data => expect(data).toBeNull());
    });

    test('idUser is undefined', () => {
        let idUser = undefined;
        let idGroup = group_data[0].id;
        getGroupInfo(idUser, idGroup).then(data => expect(data).toBeNull());
    });

    test('idGroup is undefined', () => {
        let idUser = user_data[0].id;
        let idGroup = undefined;
        getGroupInfo(idUser, idGroup).then(data => expect(data).toBeNull());
    });

    test('idUser is a string', () => {
        let idUser = "Ciao";
        let idGroup = group_data[0].id;
        getGroupInfo(idUser, idGroup).then(data => expect(data).toBeNull());
    });

    test('idUser is not a real user', () => {
        let idUser = 9999999;
        let idGroup = group_data[0].id;
        getGroupInfo(idUser, idGroup).then(data => expect(data).toBeNull());
    });

    test('idGroup is a string', () => {
        let idUser = user_data[0].id;
        let idGroup = "Ciao";
        getGroupInfo(idUser, idGroup).then(data => expect(data).toBeNull());
    });

    test('idGroup is not a real group', () => {
        let idUser = user_data[0].id;
        let idGroup = 9999999;
        getGroupInfo(idUser, idGroup).then(data => expect(data).toBeNull());
    });

    test('idGroup is not owned by userId', () => {
        let idUser = user_data[0].id;
        let idGroup = group_data[2].id;
        getGroupInfo(idUser, idGroup).then(data => expect(data).toBeNull());
    });

    test('Correct match', () => {
        let idUser = user_data[0].id;
        let idGroup = group_data[0].id;
        getGroupInfo(idUser, idGroup).then(data => expect(data).not.toBeNull());
    });
})

//--------------- TEST deleteGroup(idUser, idGroup) ----------------------------------
describe("Delete a group", () => {
    test('call with 0 parameters', () => {
        let idUser = undefined;
        let idGroup = undefined;
        deleteGroup().then(data => expect(data).toBeFalsy());
    });

    test('call with 3 parameters', () => {
        let idUser = undefined;
        let idGroup = undefined;
        deleteGroup(idUser, idGroup, 23).then(data => expect(data).toBeFalsy());
    });

    test('idUser is undefined', () => {
        let idUser = undefined;
        let idGroup = group_data[0].id;
        deleteGroup(idUser, idGroup).then(data => expect(data).toBeFalsy());
    });

    test('idGroup is undefined', () => {
        let idUser = user_data[0].id;
        let idGroup = undefined;
        deleteGroup(idUser, idGroup).then(data => expect(data).toBeFalsy());
    });

    test('idUser is a string', () => {
        let idUser = "Ciao";
        let idGroup = group_data[0].id;
        deleteGroup(idUser, idGroup).then(data => expect(data).toBeFalsy());
    });

    test('idUser is not a real user', () => {
        let idUser = 9999999;
        let idGroup = group_data[0].id;
        deleteGroup(idUser, idGroup).then(data => expect(data).toBeFalsy());
    });

    test('idGroup is a string', () => {
        let idUser = user_data[0].id;
        let idGroup = "Ciao";
        deleteGroup(idUser, idGroup).then(data => expect(data).toBeFalsy());
    });

    test('idGroup is not a real group', () => {
        let idUser = user_data[0].id;
        let idGroup = 9999999;
        deleteGroup(idUser, idGroup).then(data => expect(data).toBeFalsy());
    });

    test('idGroup is not owned by userId', () => {
        let idUser = user_data[0].id;
        let idGroup = group_data[2].id;
        deleteGroup(idUser, idGroup).then(data => expect(data).toBeFalsy());
    });

    test('Correct match', () => {
        let idUser = user_data[0].id;
        let idGroup = group_data[0].id;
        deleteGroup(idUser, idGroup).then(data => expect(data).toBeTruthy());
    });
})

//--------------- TEST addMembers(idUser, idGroup, maillist) ----------------------------------
describe("Add members by mail to an existing group", () => {
    test('call with 0 parameters', () => {
        let idUser = undefined;
        let idGroup = undefined;
        let maillist = undefined
        addMembers().then(data => expect(data).toBeNull());
    });

    test('call with 4 parameters', () => {
        let idUser = undefined;
        let idGroup = undefined;
        let maillist = undefined
        addMembers(idUser, idGroup, maillist, 23).then(data => expect(data).toBeNull());
    });

    test('idUser is undefined', () => {
        let idUser = undefined;
        let idGroup = group_data[0].id;
        let maillist = [];
        addMembers(idUser, idGroup, maillist).then(data => expect(data).toBeNull());
    });

    test('idGroup is undefined', () => {
        let idUser = user_data[0].id;
        let idGroup = undefined;
        let maillist = [];
        addMembers(idUser, idGroup, maillist).then(data => expect(data).toBeNull());
    });

    test('maillist is undefined', () => {
        let idUser = user_data[0].id;
        let idGroup = group_data[0].id;
        let maillist = undefined;
        addMembers(idUser, idGroup, maillist).then(data => expect(data).toBeNull());
    });

    test('idUser is not a number', () => {
        let idUser = "Ciao";
        let idGroup = group_data[0].id;
        let maillist = [];
        addMembers(idUser, idGroup, maillist).then(data => expect(data).toBeNull());
    });

    test('idUser is not a real user', () => {
        let idUser = 9999999;
        let idGroup = group_data[0].id;
        let maillist = [];
        addMembers(idUser, idGroup, maillist).then(data => expect(data).toBeNull());
    });

    test('idGroup is not a number', () => {
        let idUser = user_data[0].id;
        let idGroup = "Ciao";
        let maillist = [];
        addMembers(idUser, idGroup, maillist).then(data => expect(data).toBeNull());
    });

    test('idGroup is not a real group', () => {
        let idUser = user_data[0].id;
        let idGroup = 999999;
        let maillist = [];
        addMembers(idUser, idGroup, maillist).then(data => expect(data).toBeNull());
    });

    test('maillist is not an array', () => {
        let idUser = user_data[0].id;
        let idGroup = group_data[0].id;
        let maillist = "Ciao";
        addMembers(idUser, idGroup, maillist).then(data => expect(data).toBeNull());
    });

    test('maillist does not contain only mails', () => {
        let idUser = user_data[0].id;
        let idGroup = group_data[0].id;
        let maillist = [user_data[0].email, 23];
        addMembers(idUser, idGroup, maillist).then(data => expect(data).toBeNull());
    });

    test('idUser is not idGroup group owner', () => {
        let idUser = group_data[2].owner;
        let idGroup = group_data[0].id;
        let maillist = [user_data[0].email];
        addMembers(idUser, idGroup, maillist).then(data => expect(data).toBeNull());
    });

    test('Correct way', () => {
        let idUser = 0;
        let idGroup = 1;
        let maillist = [user_data[1].email];
        addMembers(idUser, idGroup, maillist).then(data => expect(data).not.toBeNull());
    });
})