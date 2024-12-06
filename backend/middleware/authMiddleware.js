const jwt = require('jsonwebtoken')
const secret = process.env.SECRET;
const verifyToken = (req, res, next)=>{
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({error: 'Access Denied'})
    }
    try {
        const verified = jwt.verify(token, secret);
        req.userId = verified.userId;
        next();
    } catch (error) {
        res.status(401).json({error: 'Invalid token'})
    }
}

module.exports = verifyToken;