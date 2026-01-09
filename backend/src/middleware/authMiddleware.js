import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    // prefer authorization header 'Bearer <token>'
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    //  alternatively accept token from query or cookie (optional)
    if (!token && req.cookies?.refreshToken) {
        return res.status(401).json({ message: "Token missing - use refresh endpoint" });
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalid ou expiré" })
    }

}

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Accès interdit pour votre rôle" });
        }
        next();
    }
}