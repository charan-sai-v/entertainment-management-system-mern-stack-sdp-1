
const jwt = require("jsonwebtoken");


// auth middleware for organizer
async function organizerAuth(req, res, next) {
    
    try {
        const token = req.header("Authorization").split(" ")[1]
        if (!token) return res.status(401).json({ message: "Access Denied" })
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.id = verified._id
        next()
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" })
    }
}

module.exports = organizerAuth;