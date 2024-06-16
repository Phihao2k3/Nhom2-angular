const jwt = require("jsonwebtoken");
const JWT_SECRET1 = 'fjsklfDSLKM';
const JWT_SECRET = 'jfldkjs';

function sign(email, expiresIn = '30m') {
    return jwt.sign(
        { email },
        JWT_SECRET1 || JWT_SECRET,
        { expiresIn }
    )
}

function verify(token) {
    try {
        jwt.verify(token, JWT_SECRET1 || JWT_SECRET);
        return true;
    }
    catch (error) {
        return false;
    }
}

module.exports = {sign, verify}