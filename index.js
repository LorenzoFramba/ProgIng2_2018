const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const unless = require('express-unless');

const PORT = process.env.PORT || 3000;
const router_answer = require("./api/def/answer.js");
const router_user = require("./api/def/user.js");
const router_token = require('./api/def/token.js');
const router_group = require("./api/def/group");
const router_exam = require("./api/def/exam");
const router_task = require("./api/def/task");

const mwBearerToken = require('express-bearer-token')();
const mwAuth = require('./middleware/mwAuth.js');
const mwErrorHandler = require('./middleware/mwErrorHandler');

mwBearerToken.unless = unless;
mwAuth.unless = unless;

// filter middleware
app.use(bodyParser.json());
app.use(mwBearerToken.unless({path: '/Token'}));
app.use(mwAuth.unless({path: '/Token'}));

// router
app.use("/Answers", router_answer);
app.use("/Users", router_user);
app.use("/Token", router_token);
app.use("/Groups", router_group);
app.use("/Exams", router_exam);
app.use("/Tasks", router_task);

// exception handling middleware
app.use(mwErrorHandler);

app.listen(PORT, () => console.log('ProgIng2 app listening on port'+ PORT));
