const express = require("express")
const app = express();
const path = require("path")
const projectRoutes = require("./routes/projectRoutes")
const userRoutes = require("./routes/userRoutes")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser());

const distPath = path.join(__dirname, "..", "..", "client", "dist")

app.use("/api/projects", projectRoutes)
app.use("/api/user", userRoutes)

app.use(express.static(distPath))


// app.post("/data", async (req, res)=>{
//     const { email, password } = req.body
//     try {
//         const token = jwt.sign(email, "secrete-key-random" )
//         res.cookie("Token", token)
//         res.json({ message: "successfull" })
//     } catch (error) {
//         res.json({
//             message: "something went wrong"
//         })
//     }
// })

app.get("/{*splat}", (req, res)=>{
    res.sendFile(path.join(distPath, "index.html"))
})


app.listen(5000, ()=>{
    console.log("server is listening..");
})