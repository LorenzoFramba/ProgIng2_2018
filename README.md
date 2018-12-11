[![Jsonnambuli Logo](https://github.com/dadebulba/ProgIng2_2018/blob/release/doc/jsonnambuli.png)](https://github.com/dadebulba/ProgIng2_2018)


# ProgIng2

Membri del gruppo:
    - Davide Bulbarelli
    - Davide Piva
    - Marco Luzzara
    - Lorenzo Framba
    - Morgan Malavasi

   # Create your own Exam

Our project will allow users to create tasks, combined in exams and assign it to group of other users. The main goal is to be able to create a task, which will be either a multiple choice task or a basic paragraph to write. The user will be able to create exams that contain tasks. These exams will have a expire date and a a maximum duration to be taken. The result of the exam will be available to be reviewed by the user or by other users with peer review enabled, which is a system that randobly assign other users (within the exam group) to review someone else's exam.


## General idea of the Scheme

![Alt Text](https://github.com/dadebulba/ProgIng2_2018/blob/release/doc/chart.png)



## Getting Started

First of all, lets introduce the APIs from our project. 
In this [Apiary](https://proging2.docs.apiary.io/#)  document you will be able to get your hands on the Apis, by using the swagger documentation provided in the link

### Prerequisites

You need to see the [Apiary](https://proging2.docs.apiary.io/#)  document to understand the API, but also you need to check out this [chart](https://github.com/dadebulba/ProgIng2_2018/blob/release/doc/chart.png) so you have a basic idea of how the system was structured and implemented. 

## Installation




### Example

A step by step series of examples that tell you how to work with any aspect of our env.

First and foremost, we need to to install the package manager for JavaScript, therefore go in the project's folder with the terminal window, and type:

```
npm install
```

then start up the server:

```
npm start
```

this will be the respond:

```
> proging2_2018@1.0.0 start /Users/macbookproretina/Desktop/API2/ProgIng2_2018
> node index.js

App listening on port 3000 on uri http://localhost

```
**GET /Token**

Firsty, we need to acquire the correct token, so let's do a **POST** request on the token

```
http://localhost:3000/v1/Token/
```

furthermore, in the application/json body, we will need to insert the email and the password.

```
{
    "email": "gino@pino.it",
    "password": "ciccio"
}
```

what we will get in the response, is the Bearer token for Authorization! we will use it in the following examples.

**POST /Exams**
In this case, we will see how to create an Exam. Open Postman, select POST and type 

```
http://localhost:3000/v1/Exams/
```

select "JSON Application/json" and in the body, create the Exam with this scheme 
```
{
    "id": F,
    "ownerId": 0,
    "name": "HCI",
    "duration": 130,
    "deadline": "2019-10-05T14:48:00.000Z",
    "startDate": "2019-10-04T14:48:00.000Z",
    "groupId": 3,
    "countTask": 10
}
```

you can change any of the parametes.


**HOW TO CHANGE A PASSWORD**

```
http://localhost:3000/v1/Users
```


In the body response you will get a Json containing something like this

```
{
    "id": 0,
    "name": "Gino",
    "lastname": "Pino",
    "email": "gino@pino.it",
    "password": "ciccio",
    "exams": [
        {
            "examId": 0,
            "startCompiling": "2018-12-05T14:43:00.000Z",
            "assignedTask": [
                1,
                2
            ],
            "prAnswer": [
                {
                    "userId": 1,
                    "taskId": 1
                }
            ],
            "points": null
        },
        {
            "examId": 1,
            "startCompiling": "2018-11-06T14:49:32.000Z",
            "assignedTask": [
                0,
                1
            ],
            "prAnswer": [
                {
                    "userId": 1,
                    "taskId": 3
                },
                {
                    "userId": 1,
                    "taskId": 1
                }
            ],
            "points": null
        }
    ]
}

```
So to change a password you need to do a **PUT** request on the User, and send in the Body

```
{
    "name": "Gino",
    "lastname": "Pino",
    "email": "gino@pino.it",
    "password": "NEWPASSWORD"
}
```

Within this system you can change the name, lastname, email and password;

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

* [**Davide Bulbarelli**](https://github.com/dadebulba/) - *programmer* -
* [**Davide Piva**](https://github.com/Pivoz) - *programmer* -
* [**Marco Luzzara**](https://github.com/marco-luzzara/) - *programmer* - 
* [**Lorenzo Framba**](https://github.com/lorenzoframba) - *programmer* - 
* [**Morgan Malavasi**](https://github.com/theRaven97) - *programmer* -

## License

This project is licensed under the UNITN License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Inspired by [Software Engineering 2](https://sites.google.com/a/unitn.it/software-engineering-ii---designing-applications-that-matter/project?authuser=0)