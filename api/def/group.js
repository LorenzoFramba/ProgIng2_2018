let express = require('express');
let router = express.Router();
let Group = require("../../model/group");

const groupLogic = require("../impl/groupImpl");

/* API per creare un nuovo gruppo */
router.post("/", async function(req, res, next) {

    //Check del body della richiesta
    let params = req.body;
    if (params === undefined){
        res.status(400).send({ message: "Body undefined" });
        return;
    }

    try {
        let group = await groupLogic.insertNewGroup(params.name, params.members, params.owner);
        let resCode = (group === null) ? 400 : 201;

        res.status(resCode).send(group);
    } catch (err){
        next(err);
    }
});

/* API per ricevere tutti i propri gruppi */
router.get("/", async function(req, res, next){
    let userId = req.uid;

    try {
        let response = await groupLogic.retrieveAllGroups(userId);
        res.status(200).json(response);
    } catch (err){
        next(err);
    }
})

/* API per modificare un gruppo esistente */
router.put("/:id", async function(req, res, next){
    let userId = req.uid;
    let groupId = req.params.id;
    let newGroup = req.body;

    if (newGroup === undefined)
        res.status(400).send({error: "Missing body content"});

    try {
        let esito = await groupLogic.modifyGroup(userId, groupId, newGroup);
        if (esito)
            res.status(200).send({message: "Group modified"});
        else
            res.status(400).send({message: "Can't update the specified group"});
    } catch (err){
        next(err);
    }
})

module.exports = router;