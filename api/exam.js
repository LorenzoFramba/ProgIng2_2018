const express = require('express');
let router_exam = express.Router();
let Exam = require('..model/exam');
var exami = new Array();
  
router_exam.get("/", function (req, res) {
    let examId = req.params.id;
    if (examId == undefined)
        res.status(400).send();
    let valuereturned = exami.find((exami) => { return exami.id == examId });

    if (valuereturned == undefined)
        res.status(404).send();
    else
        res.status(200).send(valuereturned);
})


router_exam.post("/", function (req, res) {

    let id = new Date().getTime();

    let exam = new Exam(
        id,
        req.body.name,
        req.body.duration,
        req.body.deadline,
        req.body.startDate,
        req.body.groupId,
        req.body.countTask
    )
    exami.push(exam);
    res.status(201).send(exam);

})

router_exam.delete("/:id", function (req, res) {

    res.send({ type: 'DELETE' });
})

router_exam.put("/:id", function (req, res) {

    res.send({ type: 'PUT' });
})

module.exports = router_exam;






