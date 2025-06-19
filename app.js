const express = require("express")
const { blogs } = require("./model/index")
const app = express()

require("dotenv").config()

//database connection
require("./model/index")

app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",async(req,res)=>{
    const allBlogs = await blogs.findAll()

    res.render("home",{blogs:allBlogs})
})

app.get("/single/:id",async(req,res)=>{
    const {id}=req.params
   const singleBlogs= await blogs.findAll({
        where:{
            id:id
        }
    })
    res.render("singleBlog",{singleBlogs})
})

app.get("/createBlog",(req,res)=>{
    res.render("createBlog")
})

app.post("/createBlog",async(req,res)=>{
       const {title,subTitle,description}= req.body
      await blogs.create({
        title,
        subTitle,
        description
       })

    res.redirect("/")
})

app.get("/delete/:id",async(req,res)=>{
    const {id}= req.params
   await blogs.destroy({where:{
        id:id
    }})
    res.redirect("/")
})

const PORT = process.env.PORT || 6000
app.listen(3000,()=>{
    console.log(`Node is running on port ${PORT}`)
})