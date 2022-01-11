const mongoose = require("mongoose")

const myUserschema = new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  },

  picture:{
    type:String,
    require:true
  },
  password:{
    type:String,
    require:true
  }
})

const  myUser = mongoose.model("myUser", myUserschema)

module.exports = myUser