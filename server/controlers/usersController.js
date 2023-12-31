const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user');

async function signup(req, res) {
    try {
        const {email, password} = req.body;

        const hashPassword = bcrypt.hashSync(password, 8);
    
        await User.create({email, password: hashPassword});
    
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

async function login(req, res) {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email});
        if(!user) return res.sendStatus(401);
    
        // bcrypt password hashing implementaion
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if(!passwordMatch) return res.sendStatus(401);
    
        // jwt implementation
        const expirationTime = Date.now() + 1000 * 60 * 60 * 24 * 30;
        const token = jwt.sign({sub: user._id}, process.env.SECRETKEY);
        // res.json({token});
        
        res.cookie("Authorization", token, {
            expires: new Date(expirationTime),
            httpOnly: true,
        })
        
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

function logout(req, res) {
try {
    res.clearCookie("Authorization")
    res.sendStatus(200);
} catch (err) {
    console.log(err);
    req.sendStatus(400);
}
}

function checkAuth(req, res) {
 try {
    res.sendStatus(200);
 } catch (err) {
    return res.sendStatus(400);
 }   
    
}

module.exports = {
    signup, login, logout, checkAuth
};