const express = require("express")
const app = express()

require("dotenv").config()

app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/createBlog",(req,res)=>{
    res.render("createBlog")
})

app.post("/createBlog",(req,res)=>{
    console.log(req.body)
    res.send("form submitted successfully")
})


const PORT = process.env.PORT || 6000
app.listen(3000,()=>{
    console.log(`Node is running on port ${PORT}`)
})