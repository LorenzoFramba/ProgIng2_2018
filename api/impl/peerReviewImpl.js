let ExamDb = require('../../mock/mockedExam');
let TaskDb = require('../../mock/mockedTask');
let UserDb = require('../../mock/mockedUser');
let PeerReviewDb = require('../../mock/mockedPeerReview');

const PeerReview = require('../../model/peerReview');

function createPeerReview(userId, reviewerId, taskId, examId, value) {
    return new PeerReview(userId, reviewerId, examId, taskId, value);
}

async function checkUserCanReview(reviewerId, userId, examId, taskId) {
    try {
        let userDb = new UserDb();
        let reviewUser = await userDb.read({ id: reviewerId });

        return reviewUser.exams
            .find(e => e.examId === examId).prAnswer
            .find(pr => pr.userId === userId && pr.taskId === taskId) !== undefined;
    }
    catch (err) {
        throw err;
    }
}

// DB
async function getPeerReview(userId, reviewerId, examId, taskId) {
    try {
        let peerReviewDb = new PeerReviewDb();
        return await peerReviewDb.read({ 
            userId: userId, examId: examId, taskId: taskId, reviewerId: reviewerId 
        });
    }
    catch (err) {
        throw err;
    }
}

async function addPeerReview(userId, reviewerId, taskId, examId, value) {
    try {
        let peerReview = createPeerReview(userId, reviewerId, taskId, examId, value);

        let peerReviewDb = new PeerReviewDb();
        await peerReviewDb.create(peerReview);
    }
    catch (err) {
        throw err;
    }
}

async function updatePeerReview(userId, reviewerId, taskId, examId, value) {
    try {
        let peerReview = createPeerReview(userId, reviewerId, taskId, examId, value);
        
        let peerReviewDb = new PeerReviewDb();
        await peerReviewDb.update(peerReview);
    }
    catch (err) {
        throw err;
    }
}

async function deletePeerReview(userId, reviewerId, taskId, examId) {
    try {
        let peerReviewDb = new PeerReviewDb();
        await peerReviewDb.delete({ 
            userId: userId, examId: examId, taskId: taskId, reviewerId: reviewerId 
        });
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    addPeerReview: addPeerReview,
    getPeerReview: getPeerReview,
    updatePeerReview: updatePeerReview,
    deletePeerReview: deletePeerReview,
    checkUserCanReview: checkUserCanReview
}