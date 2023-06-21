// verify token from frontend for all routes
const admin = require("firebase-admin");

const verify = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Token is missing" });
    }

    admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            req.user = decodedToken;
            next();
        })
        .catch((error) => {
            return res.status(403).json({ error: "Invalid token" });
        });
};

module.exports = verify;
