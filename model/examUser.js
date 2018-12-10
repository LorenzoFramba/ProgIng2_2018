class ExamUser {
    constructor(id,startCompiling,assignedTasks,points){
        this.id = id;
        this.startCompiling = startCompiling;
        this.assignedTasks = assignedTasks;
        this.points = points;
    }
}

module.exports = ExamUser;