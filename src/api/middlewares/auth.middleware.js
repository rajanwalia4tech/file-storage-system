const jwt = require("jsonwebtoken");

class AuthMiddleware{
    async authenticateToken(req, res, next) {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Access Denied: No Token Provided!' });
        }
        try {
            const decryptedUser = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decryptedUser;
            next();
        } catch (err) {
            console.error('AuthMiddleware - Error verifying token:', err.message);
            return res.status(401).json({ success: false, message: 'Invalid Token' });
        }
    }

}

module.exports = new AuthMiddleware();