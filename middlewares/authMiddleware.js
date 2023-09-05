"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkUser(req, res, next) {
    const token = req.headers.authorization;
    console.log("Received token:", token);
    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }
    next();
}
exports.default = checkUser;
