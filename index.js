const express = require('express');
const bodyParser = require ('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

//const router_answer = require("./api/answer.js");
const router_user = require("./api/user");
const router_group = require("./api/group");
//const router_task = require("./api/task");

// var greeting = { hello : "Hello world" };

app.use(bodyParser.json());

//app.use("/answer", router_answer);
app.use("/user",router_user);
//app.use("/task", router_task);
app.use("/group", router_group);


// app.get('/', (req, res) => res.send('Hello World!'))
 
// app.get('/greeting', (req, res) => {
//    res.json(greeting)
// })

app.listen(PORT, () => console.log('ProgIng2 app listening on port'+ PORT))

