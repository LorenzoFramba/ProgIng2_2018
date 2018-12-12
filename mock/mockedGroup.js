let GroupPrototype = require('../model/abstract/groupPrototype.js');
let group_data = require('./data/group_data');
const Group = require('../model/group');
const genericMockFunctions = require('./mockedEntity');
const  User = require('../model/user');

class MockedGroup extends GroupPrototype {
    constructor() {
        super();
        this.__ids__ = ['id'];
        
        let boundedInjector = genericMockFunctions.bind(this);
        boundedInjector(MockedGroup, Group, group_data);
    }

    searchByOwner(owner){
        if (arguments.length !== 1 || isNaN(owner))
            return null;

        //cls cls.... storage
        return new Promise((resolve, reject) => {

            var groupList = new Array();
            for (let group of group_data){
                if (group.owner === owner)
                    groupList.push(group);
            }

            let entity = Object.assign(Object.create(Group), groupList);
            resolve(entity);
        });
    }

    getUsers(groupId) {
        return new Promise((resolve, reject) => {
            var groupList = [];
            let users = group_data
                .find(g => g.id === groupId).members;

            resolve(users);
        });
    }
}

module.exports = MockedGroup;