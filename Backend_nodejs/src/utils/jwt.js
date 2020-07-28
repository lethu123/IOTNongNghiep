const jwt = require('jsonwebtoken');
const fs = require('fs');
const publicKey = fs.readFileSync(__dirname + '/key/key.pub');
const privateKey = fs.readFileSync(__dirname + '/key/key.pem');

exports.sign = (obj, callback) => {
    jwt.sign(obj, privateKey, { algorithm: 'RS256' }, (err, token) => {
        callback(err, token);
    }); 
}

exports.verify = (token, callback) => {
    jwt.verify(token, publicKey, (err, decoded) => {
        callback(err, decoded);
    });
}
