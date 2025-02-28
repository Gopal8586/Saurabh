const mongoose = require("mongoose");
const mainSchema = new mongoose.Schema({

firstname: {
    type: String,
    require: true
},
lastname:{
    type: String,
    require: true
},
email:{
    type: String,
    require: true,
    unique: true
},
phone: {
    type: Number,
    require: true,
    unique: true,
},
password: {
    type: String,
    require: true,
},

cnfpassword: {
    type: String,
    require: true
}
});

const Details = new mongoose.model("Information", mainSchema, "Information");
module.exports = Details;







const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
  });
  
  const User = mongoose.model('User', userSchema);