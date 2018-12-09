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

        console.log("Entro");

        //Check del parametro
        if (arguments.length !== 1 || idMember === undefined || typeof idMember !== "number")
            return false;

        try {
            let userDB = new UserDB();
            let response = await userDB.read({id: idMember});
            console.log("CHECK: " + response);
            if (JSON.stringify(response) !== JSON.stringify({}))
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
        else if (members.constructor !== Array || members.every(function (element) {
            return (Number.isInteger(element) && element > 0)
        }))
            return null;
        else if (typeof owner !== "number")
            return null;

        //Controllo che i membri e l'owner del gruppo siano veri utenti registrati
        if (!(members.every(await module.exports.checkMember) && await module.exports.checkMember(owner) === true))
            return null;

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
        
        console.log("CHIAMATA CON: "+ idUser + " " + idGroup + " " + newGroup);

        //Check dei parametri
        if (arguments.length !== 3 || idUser === undefined || idGroup === undefined || newGroup === undefined){
            console.log("1");
            return false;
        }
        else if (isNaN(idUser) || await this.checkMember(idUser) === false){
            console.log("2");
            return false;
        }
        else if (isNaN(idGroup) || await this.checkGroup(idGroup) === false){
            console.log("3");
            return false;
        }
        else if (newGroup.constructor !== Group){
            console.log("4");
            return false;
        }

        //Check dei campi dell'oggetto newGroup
        if (newGroup.id !== idUser || newGroup.id !== idGroup){
            console.log("5");
            return false;
        }
        else if (newGroup.id === undefined || newGroup.name === undefined || newGroup.members === undefined || newGroup.owner === undefined){
            console.log("6");
            return false;
        }

        try {
            let groupDB = new GroupDB();
            await userDB.update(newGroup);
            return true;
        } catch (err){
            throw err;
        }
    }
}