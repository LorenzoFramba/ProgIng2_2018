const jwt = require('jsonwebtoken');
const fs = require('fs');
const key = fs.readFileSync('./private/jwt_secret.key');
const errors = require('../errorMsg.js');

module.exports = {
    createToken: function(userId) {
        let payload = {
            id: userId
        };

        let options = {
            expiresIn: '1h'
        }

        let token = jwt.sign(payload, key, options);

        return token;
    },
    verifyToken: function(token) {
        try {
            let decoded = jwt.verify(token, key);
            return decoded.id;
        }
        catch(err) {
            return errors.INVALID_TOKEN;
        }
    }
}