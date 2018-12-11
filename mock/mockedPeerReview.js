let PeerReviewPrototype = require('../model/abstract/peerReviewPrototype');
let peerReview_data = require('./data/peerReview_data');
const PeerReview = require('../model/peerReview');
const genericMockFunctions = require('./mockedEntity');

class MockedPeerReview extends PeerReviewPrototype {
    constructor() {
        super();
        this.__ids__ = ['userId', 'reviewerId', 'examId', 'taskId']; 
        
        let boundedInjector = genericMockFunctions.bind(this); 
        boundedInjector(MockedPeerReview, PeerReview, peerReview_data);  
    }
}

module.exports = MockedPeerReview;