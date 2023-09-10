
const jwt = require("jsonwebtoken")

// auth middleware for user
async function userAuth(req, res, next) {
    const token = req.header("Authorization")
    if (!token) return res.status(401).json({ message: "Token not found" })
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.auth = verified
        next()
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" })
    }
}

module.exports = userAuth;