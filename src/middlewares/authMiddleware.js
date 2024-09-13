import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { AuthenticationError, AuthorizationError } from "./errorHandler.js";

dotenv.config();
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(new AuthenticationError("No token provided")); // 401 Unauthorized
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        
        if (err) {
            if(err === "TokenExpiredError") {
                return next(new AuthorizationError("Token expired"));
            }
            return next(new AuthorizationError("Invalid token")); // 403 Forbidden
        }

        req.user = user;
        next();
    });
}

export const authorizeProfileAccess = async (req, res, next) => {
    const user = req.user;
    if (user.roles.includes("admin") || parseInt(user.id) === parseInt(req.params.id)) {
        next();
    } else {
        return next(new AuthorizationError("Unauthorized"));
    }
}

export const authorizeAdmin = async (req, res, next) => {
    const user = req.user;
    if (user.roles.includes("admin")) {
        next();
    } else {
        return next(new AuthorizationError("Unauthorized"));
    }
}

export const authorizeAuthor = async (req, res, next) => {
    const user = req.user;
    if (user.roles.includes("admin") || user.roles.includes("author")) {
        next();
    } else {
        return next(new AuthorizationError("Unauthorized"));
    }
}

export const authorizeAuthorPublisher = async (req, res, next) => {
    const user = req.user;
    if (user.roles.includes("admin") || user.roles.includes("author") || user.roles.includes("publisher")) {
        next();
    } else {
        return next(new AuthorizationError("Unauthorized"));
    }
}

export const generateVerificationToken = (user) => {
    return jwt.sign({ id: user.dataValues.id, email: user.dataValues.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
}