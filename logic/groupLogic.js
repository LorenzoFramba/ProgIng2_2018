const fetch = require("node-fetch");
let Group = require("../model/group");

const urlUserAPI = "http://localhost:3000/user/";

exports.insertNewGroup = function(name, members, owner){

    //Check dei parametri
    if (arguments.length !== 3 || !name || !members || !owner)
        return null;
    else if (typeof name !== "string")
        return null;
    else if (members.constructor !== Array || members.every(function(element){ return (typeof element === "number" && element > 0)}))
        return null;
    else if (typeof owner !== "number")
        return null;

    //Controllo che i membri e l'owner del gruppo siano veri utenti registrati
    if (!(params.members.every(checkMember) && checkMember(owner) === true))
        return null;

    let id = new Date().getTime();
    return new Group(id, name, members, owner);
}

/*
    Funzione che controlla se idMember è l'id di un utente registrato
*/
function checkMember(idMember){

    //Check del parametro
    if (arguments.length !== 1 || !idMember ||typeof idMember !== "number")
        return false;

    return fetch(urlUserAPI + idMember)
        .then(res => {
            if (res.status === 200)
                return true;
            return false;
        })
}

module.exports = {
    insertGroup : insertNewGroup,
    isMember : checkMember
}