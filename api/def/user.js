let express = require('express');
let router = express.Router();

const userImpl = require("../impl/userImpl");
const apiUtility = require('../utility.js');
const errors = require('../errorMsg.js');

router.post("/", async function (req, res, next) {

    if (req.body === undefined) {
        return res.status(400).json(errors.PARAMS_UNDEFINED);
    }

    if (apiUtility.validateParamsUndefined(
        req.body.name,
        req.body.lastname,
        req.body.email,
        req.body.password)) {
        return res.status(400).json(errors.PARAMS_UNDEFINED);
    }

    if (userImpl.validateEmail(req.body.email) === false) {
        return res.status(400).json(errors.INVALID_DATA);
    }

    try{
        await userImpl.addUser(
            req.body.name,
            req.body.lastname,
            req.body.email,
            req.body.password, 
            []);
        
        return res.status(204).end();
    }
    catch (e) {
        next(e);
    }
})

router.get("/", async function (req, res, next) {
    let userId = req.uid;

    if (userId === undefined) {
        return res.status(400).json(errors.PARAMS_UNDEFINED);
    }

    if(apiUtility.validateParamsNumber(userId)){
        return res.status(400).json(errors.INVALID_DATA);
    }

    try {
        let user = await userImpl.getUser(userId);

        if(user === undefined){
            return res.status(404).json(errors.ENTITY_NOT_FOUND);
        }
        else {
            return res.status(200).json(user);
        }
        
    }
    catch (e) {
        next(e);
    }
})

router.put("/", async function (req, res, next) {
    let userId = req.uid;
    
    
    if (req.body === undefined) {
        return res.status(400).json(errors.PARAMS_UNDEFINED);
    }

    if (apiUtility.validateParamsUndefined(
        userId,
        req.body.name,
        req.body.lastname,
        req.body.email,
        req.body.password)) {
        return res.status(400).json(errors.PARAMS_UNDEFINED);
    }

    if(apiUtility.validateParamsNumber(userId)){
        return res.status(400).json(errors.INVALID_DATA);
    }

    if (userImpl.validateEmail(req.body.email) === false) {
        return res.status(400).json(errors.INVALID_DATA);
    }

    try{
        await userImpl.updateUser(userId,
            req.body.name,
            req.body.lastname,
            req.body.email,
            req.body.password);
        
        return res.status(204).end();
    }
    catch (e) {
        next(e);
    }

})

router.delete("/", async function (req, res, next) {
    let userId = req.params.id;

    if(apiUtility.validateParamsUndefined(userId)){
        return res.status(400).json(errors.PARAMS_UNDEFINED);
    }

    if(apiUtility.validateParamsNumber(userId)){
        return res.status(400).json(errors.INVALID_DATA);    
    }

    try {
        await userImpl.deleteUser(userId);
        return res.status(204).end();
    }
    catch (e) {
        next(e);
    }

})

module.exports = router;