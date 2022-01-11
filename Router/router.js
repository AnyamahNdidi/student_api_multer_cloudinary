const express = require("express")
const route = express.Router()
const multer = require("multer")
const cloudinary = require("cloudinary")

const { postUser, getData, getDataId,updateById, deleteById} = require("../controller/controller")
const { config } = require("dotenv")

const storageuplaod = multer.diskStorage({
  destination: "./upload",
  filename: (req, file, cb)=>{
    cb(null, file.originalname)
  }
})

cloudinary.config({
  cloud_name: "ndtech",
  api_key:"325692748593977",
  api_secret:"umNXDmlZgBcvD-DrYhwoehT0HDM"
})


const uploads = multer({storage:storageuplaod}).single("picture")

route.post("/post", uploads, postUser)
route.get("/", getData)
route.get("/:id", getDataId )
route.put("/:id", updateById)
route.delete("/:id", deleteById)
module.exports = route