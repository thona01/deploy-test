const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({message: "Unauthentication"});

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) return res.status(401).json({message: "Unauthentication"});
        req.user = user.data;
        next();
    });
}

module.exports = verifyToken;
