module.exports = function (app) {

    app.post('/user', (req, res) => {
        res.status(201).send("Created");
    });
};