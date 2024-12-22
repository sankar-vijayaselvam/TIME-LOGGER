const jwt = require('jsonwebtoken');// Imports the jsonwebtoken module, which is used to generate and verify JSON Web Tokens (JWTs).
const SECRET_KEY = 'supersecret';//Defines a secret key used to sign and verify JWTs

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];//Extracts the JWT from the Authorization header. It expects the header format to be Bearer <token>.
    if (!token) {
        return res.status(401).send({ status: 'error', message: 'Access Denied' });// Responds with a 401 Unauthorized status and an error message if the token is missing.
    }
    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({ status: 'error', message: 'Invalid Token' });
    }
}

module.exports = { authenticateToken };
