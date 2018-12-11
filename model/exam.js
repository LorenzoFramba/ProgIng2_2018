class Exam {
    constructor(id, ownerId, name, duration, deadline, startDate, groupId, countTask, tasks) {
        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.duration = duration;
        this.deadline = deadline;
        this.startDate = startDate;
        this.groupId = groupId;
        this.countTask = countTask;
        this.tasks = tasks;
    }
}

module.exports = Exam;
