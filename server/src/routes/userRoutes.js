const express = require("express");
const router = express.Router();
const sessingHandling = require("../middleware/sessionHandling")
const SECRETE_KEY = "ED-token-parser"
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

express().use(cookieParser())

router.post("/login/verification", sessingHandling, async (req, res)=>{
    const {email, password} = req.body;
    try{
        // SQL check
        res.json({
            message: "success"
        })
    } catch(error) {
        console.error(error)
        res.json({
            message: "something went wrong"
        })
    }
})

router.post("/session/verification", async (req, res)=>{
    const token = await req.cookies.ed_token
    if(!token){
        return res.json({message: "rejected"})
    }
    try{
        const decoded = jwt.verify(token, SECRETE_KEY)
        req.user = decoded;
        res.json({message: "success", user: decoded})
    } catch (error){
        console.error(error)
        res.status(403).json({
            message: "rejected"
        })
    }
})

router.post("/session/logout", async (req, res)=>{
    try {
        res.clearCookie("ed_token")
        res.json({
            message: "Logout"
        })
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;