let express = require('express');
let router = express.Router();
let Group = require("../../model/group");

const groupLogic = require("../impl/groupImpl");

let groups = new Array();

/* API per creare un nuovo gruppo */
router.post("/", function(req, res) {

    //Check del body della richiesta
    let params = req.body;
    if (params === undefined){
        res.status(400).send({ message: "Body undefined" });
        return;
    }

    let group = groupLogic.insertNewGroup(params.name, params.members, params.owner);
    let resCode = (group === null) ? 400 : 201;

    res.status(resCode).send(group);
});

/* API per ricevere tutti i propri gruppi */
router.get("/", function(req, res){
    
})

module.exports = router;