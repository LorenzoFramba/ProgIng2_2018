const fetch = require("node-fetch");
let Group = require("../model/group");

const urlUserAPI = "http://localhost:3000/user/";

module.exports = {

    /* Funzione che controlla se idMember è un utente registrato */
    checkMember : function(idMember) {

        //Check del parametro
        if (arguments.length !== 1 || !idMember || typeof idMember !== "number")
            return false;

        console.log("URL checkMembers: " + urlUserAPI + idMember);

        return fetch(urlUserAPI + idMember)
            .then(res => {
                if (res.status === 200)
                    return true;
                return false;
            })
    },

    /* Funzione per inserire nel sistema un nuovo gruppo */
    insertNewGroup : function(name, members, owner) {

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
        if (!(members.every(module.exports.checkMember) && module.exports.checkMember(owner) === true))
            return null;

        let id = new Date().getTime();

        let nuovoGruppo = new Group(id, name, members, owner);
        console.log("NEW_GROUP = " + JSON.stringify(nuovoGruppo));

        return nuovoGruppo;
    }
}