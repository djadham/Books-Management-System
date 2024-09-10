import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        
        if (err) {
            if(err === "TokenExpiredError") {
                return res.status(401).send({ message: "Token has expired. Please log in again." });
            }
            return res.status(403).send({ message: "Invalid token" });
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
        return res.status(403).send({ message: "Unauthorized" });
    }
}

export const authorizeAdmin = async (req, res, next) => {
    const user = req.user;
    if (user.roles.includes("admin")) {
        next();
    } else {
        return res.status(403).send({ message: "Unauthorized" });
    }
}

export const authorizeAuthor = async (req, res, next) => {
    const user = req.user;
    if (user.roles.includes("admin") || user.roles.includes("author")) {
        next();
    } else {
        return res.status(403).send({ message: "Unauthorized" });
    }
}

export const authorizeAuthorPublisher = async (req, res, next) => {
    const user = req.user;
    if (user.roles.includes("admin") || user.roles.includes("author") || user.roles.includes("publisher")) {
        next();
    } else {
        return res.status(403).send({ message: "Unauthorized" });
    }
}