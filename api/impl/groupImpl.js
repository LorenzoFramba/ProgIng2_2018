const fetch = require("node-fetch");
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
            if (JSON.stringify(response) !== JSON.stringify({}))
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
        

        //Controllo che i membri e l'owner del gruppo siano veri utenti registrati
        //if (!((members.length !== 0 && members.every(module.exports.checkMemberWrapper)) && module.exports.checkMemberWrapper(owner) === true))
        /*if (!module.exports.checkMemberWrapper(owner) || (members.length !== 0 && !members.every(module.exports.checkMemberWrapper))){
            console.log("NULL");
            return null;
        }*/

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

        try {
            let groupDB = new GroupDB();
            await groupDB.update( this.createGroup(newGroup.id, newGroup.name, newGroup.members, newGroup.owner));
            return true;
        } catch (err){
            throw err;
        }
    }
}