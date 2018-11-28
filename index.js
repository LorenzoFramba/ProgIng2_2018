const express = require('express');
const bodyParser = require ('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const router_answer = require("./api/answer");

const router_task = require("./api/task");

const router_user = require("./api/user");

// var greeting = { hello : "Hello world" };

app.use(bodyParser.json());

app.use("/answer", router_answer);
app.use("/user",router_user);
app.use("/task", router_task);


// app.get('/', (req, res) => res.send('Hello World!'))
 
// app.get('/greeting', (req, res) => {
//    res.json(greeting)
// })

app.listen(PORT, () => console.log('ProgIng2 app listening on port'+ PORT))

