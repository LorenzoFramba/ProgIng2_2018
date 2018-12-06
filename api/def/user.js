let express = require('express');
let router = express.Router();
let User = require("../../model/user");
let users = new Array();

// const mwBearerToken = require('express-bearer-token');
// const mwAuth = require('../../middleware/mwAuth.js');

// router.use(mwBearerToken());
// router.use(mwAuth);

router.post("/", function(req, res) {
     let id = new Date().getTime();
     //console.log(req.body);
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
})

router.get("/:id", function(req,res) {
    //console.log(req.params.id);
    let userId = req.uid;
    if(userId == undefined){
        res.status(400).send();
    }
    let valueReturned = users.find((user) => {return user.id == userId});
    if(valueReturned == undefined) {
        res.status(404).send();
    }
    else{
        res.status(200).send(valueReturned);
    }
    
})

module.exports = router;