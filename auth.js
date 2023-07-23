const jwt = require('jsonwebtoken');

const secretKey = 'saMbiRejOguMregah2023';

const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '7d' });
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return false;
    }
}

module.exports = {
    generateToken,
    verifyToken
}