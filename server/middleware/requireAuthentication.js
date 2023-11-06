const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function requireAuthentication(req, res, next) {
try {
    const token = req.cookies.Authorization;

    const decoded = jwt.verify(token, process.env.SECRETKEY);

    if(Date.now()> decoded.expiration) return res.sendStatus(401);

    const user = await User.findById(decoded.sub);
    if(!user) return res.sendStatus(401);

    req.user = user;

    next()
} catch(err) {
    return res.sendStatus(401);
}
}

module.exports = requireAuthentication;