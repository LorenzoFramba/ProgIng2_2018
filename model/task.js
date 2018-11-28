class task {
    constructor(id,text,options,score,isPeerReview,category,correctAnswer){
        this.id = id;
        this.text = text;
        this.options = options;
        this.score = score;
        this.isPeerReview = isPeerReview;
        this.category = category;
        this.correctAnswer = correctAnswer;
    }
}

module.exports = task;