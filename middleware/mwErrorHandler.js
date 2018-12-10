module.exports = async function(err, req, res, next) {
    console.log(err);
    return res.status(500).json(err);
};