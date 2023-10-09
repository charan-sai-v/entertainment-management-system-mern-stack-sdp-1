
const jwt = require("jsonwebtoken");


// auth middleware for organizer
async function organizerAuth(req, res, next) {
    
    try {
        const token = req.header("Authorization").split(" ")[1]
        if (!token) return res.status(401).json({ message: "Access Denied" })
        // check if token is valid and not expired
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        if (!verified) return res.status(401).json({ message: "Access Denied" })
        // add id to req object
        req.id = verified._id
        next()
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" })
    }
}

module.exports = organizerAuth;