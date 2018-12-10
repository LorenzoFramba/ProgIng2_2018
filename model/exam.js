class Exam {
    constructor(id, ownerId, name, duration, deadline, startDate, tasks, groupId, countTask) {
        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.duration = duration;
        this.deadline = deadline;
        this.startDate = startDate;
        this.groupId = groupId;
        this.countTask = countTask;
    }
}

module.exports = Exam;
