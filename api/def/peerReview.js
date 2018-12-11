const express = require('express');
const router = express.Router();

const apiUtility = require('../utility.js');
const errors = require('../errorMsg.js');
const peerReviewImpl = require('../impl/peerReviewImpl');

router.get('/', async function(req, res, next) {
    if (apiUtility.validateParamsUndefined(req.query.user, req.query.task, req.query.exam, req.query.reviewer))
        return res.status(400).json(errors.PARAMS_UNDEFINED);

    let q_userid = apiUtility.castToInt(req.query.user);
    let q_taskid = apiUtility.castToInt(req.query.task);
    let q_examid = apiUtility.castToInt(req.query.exam);
    let q_reviewerid = apiUtility.castToInt(req.query.reviewer);
    let userId = req.uid;

    if (!apiUtility.validateParamsNumber(q_userid, q_taskid, q_examid, q_reviewerid))
        return res.status(400).json(errors.PARAMS_WRONG_TYPE);

    try {
        if (!(await apiUtility.checkUserAccessOnExam(q_reviewerid, userId, q_examid)))
            return res.status(401).json(errors.ACCESS_NOT_GRANTED);

        if (!(await peerReviewImpl.checkUserCanReview(q_reviewerid, q_userid, q_examid, q_taskid)))
            return res.status(401).json(errors.ACCESS_NOT_GRANTED);

        let peerReview = await peerReviewImpl.getPeerReview(q_userid, q_reviewerid, q_examid, q_taskid);
        if (peerReview === undefined)
            return res.status(404).send(errors.ENTITY_NOT_FOUND);
        else
            return res.status(200).json(peerReview);
    }
    catch (err) {
        return next(err);
    }
});

router.post('/', async function(req, res, next) {
    if (apiUtility.validateParamsUndefined(req.query.task, req.query.exam, req.query.user))
        return res.status(400).json(errors.PARAMS_UNDEFINED);

    let q_taskid = apiUtility.castToInt(req.query.task);
    let q_examid = apiUtility.castToInt(req.query.exam);
    let q_userid = apiUtility.castToInt(req.query.user);
    let b_value = req.body.value;
    let reviewerId = req.uid;

    if (!apiUtility.validateParamsNumber(q_taskid, q_examid, q_userid))
        return res.status(400).json(errors.PARAMS_WRONG_TYPE);

    try {
        if (!(await peerReviewImpl.checkUserCanReview(reviewerId, q_userid, q_examid, q_taskid)))
            return res.status(401).json(errors.ACCESS_NOT_GRANTED);

        await peerReviewImpl.addPeerReview(q_userid, reviewerId, q_taskid, q_examid, b_value);
        return res.status(204).end();
    }
    catch (err) {
        if (err.code === 'M0003')
            return res.status(400).json(err);
        else
            return next(err);
    }
});

router.put('/', async function(req, res, next) { 
    if (apiUtility.validateParamsUndefined(req.query.task, req.query.exam, req.query.user))
        return res.status(400).json(errors.PARAMS_UNDEFINED);

    let q_taskid = apiUtility.castToInt(req.query.task);
    let q_examid = apiUtility.castToInt(req.query.exam);
    let q_userid = apiUtility.castToInt(req.query.user);
    let b_value = req.body.value;
    let reviewerId = req.uid;

    if (!apiUtility.validateParamsNumber(q_taskid, q_examid, q_userid))
        return res.status(400).json(errors.PARAMS_WRONG_TYPE);

    try {  
        if (!(await peerReviewImpl.checkUserCanReview(reviewerId, q_userid, q_examid, q_taskid)))
            return res.status(401).json(errors.ACCESS_NOT_GRANTED);

        await peerReviewImpl.updatePeerReview(q_userid, reviewerId, q_taskid, q_examid, b_value);
        return res.status(204).end();
    }
    catch (err) {
        if (err.code === 'M0002')
            return res.status(404).json(err);
        else
            return next(err);
    }
});

router.delete('/', async function(req, res, next) {
    if (apiUtility.validateParamsUndefined(req.query.task, req.query.exam, req.query.user))
        return res.status(400).json(errors.PARAMS_UNDEFINED);

    let q_taskid = apiUtility.castToInt(req.query.task);
    let q_examid = apiUtility.castToInt(req.query.exam);
    let q_userid = apiUtility.castToInt(req.query.user);
    let reviewerId = req.uid;

    if (!apiUtility.validateParamsNumber(q_taskid, q_examid, q_userid))
        return res.status(400).json(errors.PARAMS_WRONG_TYPE);

    try {
        if (!(await peerReviewImpl.checkUserCanReview(reviewerId, q_userid, q_examid, q_taskid)))
            return res.status(401).json(errors.ACCESS_NOT_GRANTED);

        await peerReviewImpl.deletePeerReview(q_userid, reviewerId, q_taskid, q_examid);
        return res.status(204).end();
    }
    catch (err) {
        if (err.code === 'M0002')
            return res.status(404).json(err);
        else
            return next(err);
    }
});

module.exports = router;