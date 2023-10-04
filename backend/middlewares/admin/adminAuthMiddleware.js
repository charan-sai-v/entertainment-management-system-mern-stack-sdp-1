
const jwt = require("jsonwebtoken");


// auth middleware for admin
async function adminAuth(req, res, next) {
    
    try {
        const token = req.header("Authorization").split(" ")[1]
        if (!token) return res.status(401).json({ message: "Access Denied" })
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.admin = verified
        next()
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" })
    }
}

module.exports = adminAuth;