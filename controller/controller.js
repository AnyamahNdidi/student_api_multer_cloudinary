const myUser = require("../model/models")
const {myauth} = require("../validationSc")
const bycript  = require("bcryptjs")
const multer = require("multer")
const cloudinary = require("cloudinary")



cloudinary.config({
  cloud_name: "ndtech",
  api_key:"325692748593977",
  api_secret:"umNXDmlZgBcvD-DrYhwoehT0HDM"
})

const  postUser = async (req, res)=>{
  const clouduplaod = await cloudinary.uploader.upload(req.file.path)
  console.log(clouduplaod);
    try{
      const result = myauth.validate(req.body)

      if(result.error){
        console.log("error")
          res.status(400).json({message: result.error.details[0].message})
      }

      const salt = await bycript.genSalt(10)
      const hashPassword =await bycript.hash(req.body.password, salt)

      const myUserdata = await myUser.create({
        name: req.body.name,
        email:req.body.email,
        password:hashPassword,
        // picture: req.file.originalname
        picture: clouduplaod.secure_url

     })
      
     res.status(201).json({data: myUserdata})

    }catch(error){

      res.status(404).json({message : error.message})
    }
  

}

const getData = async (req, res)=>{
   const myData = await myUser.find()
   res.status(200).json(myData)
}


const getDataId = async (req, res)=>{
     const {id} = req.params
     try{
      const singleData = await myUser.findById(id)
      res.status(200).json(singleData) 
     }catch(error){
       res.status(400).json({message: error.message})
     }
    
}

const updateById = async (req, res)=>{
  try{
    const upDate = await myUser.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(upDate)
   }catch(error){
     res.status(400).json({message: error.message})
   }
}

const deleteById = async (req, res)=>{
  try{
    const upDate = await myUser.deleteById(req.params.id)
    res.status(200).json(upDate)
   }catch(error){
     res.status(400).json({message: "delete sucessfully"})
   }
}

module.exports = {
  postUser,
  getData,
  getDataId,
  updateById,
  deleteById
}