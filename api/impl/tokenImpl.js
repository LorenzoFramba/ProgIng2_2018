const jwt = require('jsonwebtoken');
const fs = require('fs');
const key = fs.readFileSync('./private/jwt_secret.key');
const errors = require('../errorMsg.js');
    
module.exports = {
    createToken: function(userId) {
        return new Promise((resolve, reject) => {
            let payload = {
                id: userId
            };
    
            let options = {
                expiresIn: '1h'
            }
    
            jwt.sign(payload, key, options, (err, token) => {
                if (err) {
                    reject(err);
                }
                else
                    resolve(token);
            });
        });
    },
    verifyToken: function(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, key, (err, decoded) => {
                if (err)
                    reject(errors.INVALID_TOKEN);
                else
                    resolve(decoded.id);
            });
        });
    }
}