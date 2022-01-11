const joi = require("@hapi/joi")

const myauth  = joi.object({
name:joi.string().required().min(6).max(20),
email:joi.string().email().lowercase().required(),
password:joi.string().min(8),
})

module.exports = {
  myauth
}