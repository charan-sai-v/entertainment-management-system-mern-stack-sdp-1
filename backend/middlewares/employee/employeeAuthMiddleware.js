
const jwt = require("jsonwebtoken")

// auth middleware for employee
async function employeeAuth(req, res, next) {
    const token = req.header("Authorization")
    if (!token) return res.status(401).json({ message: "Token not found" })
    
    try {
        const token = req.header("Authorization").split(" ")[1]
        if (!token) return res.status(401).json({ message: "Access Denied" })
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.employee = verified
        next()
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" })
    }
}

module.exports = employeeAuth;