const { JsonWebTokenError } = require("jsonwebtoken");

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. Auth token missing');
    try {
        const decoded = jwt.verify(token, process.env.jwtprivatekeymeet)
        req.user = decoded
        next();
    }
    catch (e) {
        res.status(400).send('Invalid Token');

    }
}