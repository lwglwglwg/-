let enviroment = process.env.VUE_APP_ENV
let config = require("./env."+enviroment)
module.exports=config