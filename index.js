const express = require('express')
const mongoose  = require('mongoose')
const app =express()
const cors = require('cors')
const dotenv = require('dotenv')
const url = "mongodb://localhost/datapra"
const myRouter = require("./Router/router")

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}).then(()=>{
  console.log("data base has been connected sucessfully")
}).catch(err => console.log(err))

app.use("/", myRouter)

app.get("/", (req, res)=>{
    res.send("creating an api")
})


app.listen(5000, ()=>{
  console.log("port is ready")
})