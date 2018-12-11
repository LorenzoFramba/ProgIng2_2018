let Group = require("../../model/group");
let GroupDB = require('../../mock/mockedGroup');
let UserDB = require("../../mock/mockedUser");

module.exports = {

    /* Funzione di utilità per istanziare un nuovo gruppo */
    createGroup : function(id, name, members, owner){
        return new Group(id, name, members, owner);
    },

    /* Funzione che controlla se idMember è un utente registrato */
    checkMember : async function(idMember) {
        //Check del parametro
        if (arguments.length !== 1 || idMember === undefined || typeof idMember !== "number")
            return false;

        try {
            let userDB = new UserDB();
            let response = await userDB.read({id: idMember});
            if (response !== undefined && JSON.stringify(response) !== JSON.stringify({}))
                return true;
            else 
                return false;
        } catch (err){
            throw err;
        }
    },

    /* Funzione che controlla se idGroup è realmente un gruppo esistente */
    checkGroup : async function(idGroup){
        //Check del parametro
        if (arguments.length !== 1 || idGroup === undefined || isNaN(idGroup))
            return false;

        try {
            let groupDB = new GroupDB();
            let response = await groupDB.read({id: idGroup});
            if (response !== undefined)
                return true;
            else
                return false;
        } catch (err){
            throw err;
        }
    },

    /* Funzione per inserire nel sistema un nuovo gruppo */
    insertNewGroup : async function(name, members, owner) {

        //Check dei parametri
        if (arguments.length !== 3 || name === undefined || members === undefined || owner === undefined)
            return null;
        else if (typeof name !== "string")
            return null;
        else if (members.constructor !== Array || (members.length !== 0 && members.every(function (element) {
            return (Number.isInteger(element) && element > 0)
        })))
            return null;
        else if (isNaN(owner))
            return null;
        else if (await module.exports.checkMember(owner) === false)
            return null;

        //Controllo dell'array dei membri
        for (let member of members){
            if (await module.exports.checkMember(member) === false)
                return null;
        }

        let id = new Date().getTime();
        let nuovoGruppo = new Group(id, name, members, owner);

        //Inserisco il nuovo gruppo nel DB
        try {
            let groupDB = new GroupDB();
            await groupDB.create(nuovoGruppo);

            return nuovoGruppo;
        } catch(err){
            throw err;
        }
    },

    /* Funziona che ritorna una lista di gruppi che hanno come owner idUser */
    retrieveAllGroups : async function(idUser){
        
        //Check dei parametri
        if (arguments.length !== 1 || isNaN(idUser) || idUser < 0)
            return null;

        try {
            let groupDB = new GroupDB();
            let groups = await groupDB.searchByOwner(idUser);

            //Secco via members e owner
            let finalGroups = new Array();
            for (var i=0; i<groups.length && groups[i] !== undefined; i++)
                finalGroups.push({id: groups[i].id, name: groups[i].name});

            return finalGroups;
        } catch (err){
            throw err;
        }
    },

    /* Funzione che modifica il gruppo con id idGroup */
    modifyGroup : async function(idUser, idGroup, newGroup){

        //Check dei parametri
        if (arguments.length !== 3 || idUser === undefined || idGroup === undefined || newGroup === undefined)
            return false;
        else if (isNaN(idUser) || await module.exports.checkMember(idUser) === false)
            return false;
        else if (isNaN(idGroup) || await module.exports.checkGroup(idGroup) === false)
            return false;

        //Check dei campi dell'oggetto newGroup
        if (newGroup.id === undefined || newGroup.name === undefined || newGroup.members === undefined || newGroup.owner === undefined)
            return false;
        else if (newGroup.owner !== idUser || newGroup.id != idGroup || typeof newGroup.name !== "string" || newGroup.members.constructor !== Array)
            return false;

        //Controllo dell'array dei membri di newGroup
        for (let member of newGroup.members)
            if (await module.exports.checkMember(member) === false)
                return false;

        try {
            let groupDB = new GroupDB();
            await groupDB.update( module.exports.createGroup(newGroup.id, newGroup.name, newGroup.members, newGroup.owner));
            return true;
        } catch (err){
            throw err;
        } 
    },

    /* Funzione che prende tutti i dettagli di un determinato gruppo */
    getGroupInfo : async function(userId, groupId){

        //Check dei parametri
        if (arguments.length !== 2 || userId === undefined || groupId === undefined)
            return null;
        else if (isNaN(userId) || await module.exports.checkMember(userId) === false)
            return null;
        else if (isNaN(groupId) || await module.exports.checkGroup(groupId) === false)
            return null;

        try {
            let groupDB = new GroupDB();
            let groups = await groupDB.searchByOwner(userId);

            for (var i=0; i<groups.length && groups[i] !== undefined; i++)
                if (groups[i].id == groupId)
                    return groups[i];

            return null;
        } catch (err){
            throw err;
        }
    },

    /* Funzione per eliminare un gruppo */
    deleteGroup : async function(userId, groupId){

        //Check dei parametri
        if (arguments.length !== 2 || userId === undefined || groupId === undefined)
            return false;
        else if (isNaN(userId) || await module.exports.checkMember(userId) === false)
            return false;
        else if (isNaN(groupId) || await module.exports.checkGroup(groupId) === false)
            return false;

        try {
            let groupDB = new GroupDB();
            let groups = await groupDB.searchByOwner(userId);

            for (var i=0; i<groups.length && groups[i] !== undefined; i++)
                if (groups[i].id == groupId){
                    await groupDB.delete({id: groups[i].id});
                    return true;
                }
            return false;
        } catch (err){
            throw err;
        }
    },

    /* Funzione per aggiungere una lista di utenti (mail) a un gruppo esistente */
    addMembers : async function(idUser, idGroup, mailList){
        //Check dei parametri
        if (arguments.length !== 3 || idUser === undefined || idGroup === undefined || mailList === undefined)
            return null;
        else if (isNaN(idUser) || await module.exports.checkMember(idUser) === false)
            return null;
        else if (isNaN(idGroup) || await module.exports.checkGroup(idGroup) === false)
            return null;

        if (mailList.constructor !== Array || !mailList.every(function (element){
            return (typeof element === "string");
        }))
            return null;

        //Converto le mail negli idUser corrispondenti
        let arrayUser = new Array();
        let userDB = new UserDB();
        for (let mail of mailList){
            let user = await userDB.getUserByMail(mail);
            if (user !== null)
                arrayUser.push(user);
        }

        //Becco il gruppo indicato dall'utente
        let groupDB = new GroupDB();
        let group = await groupDB.read({id: idGroup});

        if (group !== undefined){

            let concat = arrayUser.concat(group.members);

            let groupMod = new Group(group.id, group.name, concat, group.owner);
            if(await module.exports.modifyGroup(idUser, idGroup, groupMod))
                return groupMod;
            else    
                return null;
        }
        else{
            return null;
        }

    }
}