class PeerReview {
    constructor(user_id, reviewer_id, exam_id, task_id, value) {
        this.userId = user_id;
        this.reviewerId = reviewer_id;
        this.examId = exam_id;
        this.taskId = task_id;
        this.value = value;
    }
};

module.exports = PeerReview;