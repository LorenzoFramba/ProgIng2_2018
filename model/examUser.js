class ExamUser {
    constructor(examId, startCompiling, assignedTasks, prAnswer, points){
        this.examId = examId;
        this.startCompiling = startCompiling;
        this.assignedTasks = assignedTasks;
        this.prAnswer = prAnswer;
        this.points = points;
    }
}

module.exports = ExamUser;