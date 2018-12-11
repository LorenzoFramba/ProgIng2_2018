# ProgIng2

Membri del gruppo:
    - Davide Bulbarelli
    - Davide Piva
    - Marco Luzzara
    - Lorenzo Framba
    - Morgan Malavasi

   # Create your own Exam

Our project will allow users to create tasks, combined in exams and assign it to group of other users. The main goal is to be able to create a task, which will be either a multiple choice task or a basic paragraph to write. The user will be able to create exams that contain tasks. These exams will have a expire date and a a maximum duration to be taken. The result of the exam will be available to be reviewed by the user or by other users with peer review enabled, which is a system that randobly assign other users (within the exam group) to review someone else's exam.


## General idea of the Sceme





## Getting Started

First of all, lets introduce the APIs from our project. 
In this [Apiary](https://proging2.docs.apiary.io/#)  document you will be able to get your hands on the Apis, by using the swagger documentation provided in the link

### Prerequisites

You need to see the [Apiary](https://proging2.docs.apiary.io/#)  document to understand the API, but also you need to check out this [chart](https://ProgIng2_2018/Chart.png) so you have a basic idea of how the system was structured and implemented. 



### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

First and foremost, you will need to open a terminal window onto the project's folder, and then execute "  npm start " in order to initialize the server.
Through postman, by going into the localhost:3000/ address,you then will be able to choose what API to use. For example, To create a Task, simply go to ../Tasks and insert a json format code into the body of the request, containing all the Task info.


### And coding style tests

Throughtout the coding experience, we have seen different approaches and styles, so in order to minimize the human error for eventual reviews of the code, we have tried to adopted to similar guidelines, so take that in mind when reviewing. 



## Deployment

The project has been connected to [Heroku](https://proging2dev.herokuapp.com) so the deployment is easily accessible online.

## Built With

* [Heroku](https://proging2dev.herokuapp.com) - The web framework used
* [Apiary](https://proging2.docs.apiary.io/#) - Api Management


## Terminology

Assignment: It's an Exam and is composed by multiple tasks
Task: Could be either a multiple choice task, true or false or written paragraph.



## Authors

* **Davide Bulbarelli** - *Initial work* - [Github](https://github.com/dadebulba/)
* **Davide Piva** - *Initial work* - [Github](https://github.com/Pivoz)
* **Marco Luzzara** - *Initial work* - [Github](https://github.com/marco-luzzara/)
* **Lorenzo Framba** - *Initial work* - [Github](https://github.com/lorenzoframba)
* **Morgan Malavasi** - *Initial work* - [Github](https://github.com/theRaven97)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Inspired by [Software Engineering 2](https://sites.google.com/a/unitn.it/software-engineering-ii---designing-applications-that-matter/project?authuser=0)