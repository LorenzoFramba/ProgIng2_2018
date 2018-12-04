let express = require('express');
let router = express.Router();
let User = require("../model/user");
let users = new Array();

//TODO: sistemare problema JSON.parse <anonymous>
router.post("/", function(req, res) {
    console.log("Post incoming ",req.body);
    let usrOnBody = req.body;
    
    if(usrOnBody === undefined){
        res.status(400).send();
        return; //evito di andare avanti
    }   
    if(usrOnBody.name === undefined 
        || usrOnBody.lastname === undefined
        || usrOnBody.username === undefined
        || usrOnBody.email === undefined
        || usrOnBody.password === undefined
        || usrOnBody.exams === undefined){
            res.status(400).send();
            return;
        }

     let id = new Date().getTime();
     let user = new User(
         id,
         req.body.name,
         req.body.lastname,
         req.body.username,
         req.body.email,
         req.body.password,
         req.body.exams         
     );
     users.push(user);
     res.status(201).send(user);
     return;
})

router.get("/:id", function(req,res) {
    let userId = req.params.id;
    if(userId == undefined){
        res.status(400).send();
        return;
    }
    let valueReturned = users.find((user) => {return user.id == userId});
    if(valueReturned == undefined) {
        res.status(404).send();
        return;
    }
    else{
        res.status(200).send(valueReturned);
        return;
    }
    
})

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = router;