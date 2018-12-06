class Exam {
    constructor(id, owner_id, name, duration, deadline, startDate, tasks, groupId, countTask) {
        this.id = id;
        this.owner_id = owner_id;
        this.name = name;
        this.duration = duration;
        this.deadline = deadline;
        this.startDate = startDate;
        this.tasks = tasks;
        this.groupId = groupId;
        this.countTask = countTask;
    }
}

module.exports = Exam;
