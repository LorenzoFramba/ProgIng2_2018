let express = require('express');
let router = express.Router();
let User = require("../../model/user");
const userLogic = require("../impl/userImpl");

let users = new Array();

router.post("/", function(req, res) {
    console.log("Post incoming ",req.body);
    let usrOnBody = req.body;
    
    if(usrOnBody === undefined){
        return res.status(400).send();
    }   
    
    if(userLogic.checkPostParams(usrOnBody) === false){
            return res.status(400).send();
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
     return res.status(201).send(user);

})

router.get("/:id", function(req,res) {
    let userId = req.uid;
    if(userId == undefined){
        return res.status(400).send();
    }

    
    if(isNaN(userId)){
        return res.status(400).send(); 
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

router.put("/:id", function(req,res) {
    let userId = req.params.id;
    if(userId == undefined){
        return res.status(400).send();
    }

    if(isNaN(userId)){
        return res.status(400).send();
    }

    let valueReturned = users.find((user) => {return user.id == userId});
    if(valueReturned == undefined) {
        return res.status(404).send();
    }

    let newUser = req.body;
    if(newUser == undefined){
        return res.status(400).send();
    }

    for(let [index,element] of users.entries()) {
        if(element.id === valueReturned.id) {
            users[index] = newUser;
            return res.status(200).send(valueReturned); 
        }
    }
    
})

router.delete("/:id", function(req,res) {
    let userId = req.params.id;

    if(userId == undefined){
        return res.status(400).send();
    }

    if(isNaN(userId)){
        return res.status(400).send();
    }

    let notfound = true;
    users.forEach((user,index) => {
        if(user.id == userId){
            users.splice(index,1);
            notfound = false;
        }      
    });

    if(notfound)
        return res.status(404).send();
    
    return res.status(200).send();
})

module.exports = router;