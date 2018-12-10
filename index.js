const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const unless = require('express-unless');
const config = require('config');

const basePath = config.get("basePath");
const PORT = process.env.PORT || config.get('port');
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
//app.use(mwBearerToken.unless({ path: `/${basePath}/Token` }));
//app.use(mwAuth.unless({ path: `/${basePath}/Token` }));

app.use(mwBearerToken.unless({ path: [
    `/${basePath}/Token`, 
    {
        url: `/${basePath}/Users`,
        methods: ['POST']
    }
] }));
app.use(mwAuth.unless({ path: [
    `/${basePath}/Token`, 
    {
        url: `/${basePath}/Users`,
        methods: ['POST']
    }
] }))

app.use(`/${basePath}/Answers`, router_answer);
app.use(`/${basePath}/Users`, router_user);
app.use(`/${basePath}/Token`, router_token);
app.use(`/${basePath}/Groups`, router_group);
app.use(`/${basePath}/Exams`, router_exam);
app.use(`/${basePath}/Tasks`, router_task);


// exception handling middleware
app.use(mwErrorHandler);

app.listen(PORT, () => console.log(`App listening on port ${PORT} on uri ${config.endpoint}`));
