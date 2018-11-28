const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const router_answer = require("./api/answer.js");
const router_task = require("./api/task.js");

var greeting = { hello : "Hello world"};

app.use("/answer", router_answer);

app.use("/task", router_task);


// app.get('/', (req, res) => res.send('Hello World!'))
 
// app.get('/greeting', (req, res) => {
//    res.json(greeting)
// })
 
app.listen(PORT, () => console.log('ProgIng2 app listening on port'+ PORT))

