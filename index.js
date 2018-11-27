const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const router_answer = require("./api/answer.js");

var greeting = { hello : "Hello world"};

app.use("/answer", router_answer);

app.listen(PORT);

// app.get('/', (req, res) => res.send('Hello World!'))
 
// app.get('/greeting', (req, res) => {
//    res.json(greeting)
// })
 
// app.listen(PORT, () => console.log('ProgIng2 app listening on port'+ PORT))

