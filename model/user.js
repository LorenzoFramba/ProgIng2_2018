class User {
    constructor(id,name,lastname,username,email,password,exams){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.exams = exams;
    }
}

module.exports = User;