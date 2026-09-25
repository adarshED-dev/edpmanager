const express = require("express")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const SECRETE_KEY = "ED-token-parser"

express().use(cookieParser())

const sessionHandling = async (req, res, next)=>{
    const {email} = req.body
    try{
        const token = jwt.sign(email, SECRETE_KEY)
        res.cookie("ed_token", token);
        console.log("Login Successfully")
        next();
    }catch (error) {
        console.error(error)
        res.json({ 
            message: "Required Token"
        })
    }
}


module.exports = sessionHandling;