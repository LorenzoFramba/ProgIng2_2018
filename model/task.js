class Task {
    constructor(id, examId, text, options, score, isPeerReview, category, correctAnswer){
        this.id = id;
        this.examId = examId;
        this.text = text;
        this.options = options;
        this.score = score;
        this.isPeerReview = isPeerReview;
        this.category = category;
        this.correctAnswer = correctAnswer;
    }
}

module.exports = Task;