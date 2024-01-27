const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
name:{
      type: String,
      required: true,
    },
    email:{
      type: String,
      require: true,
    },
    password:{
        type:String,
        require:true,
    },
    role:{
      type: String,
      default:'user'
    }
   
   

  },
  { timestamps: true }
);

//create collection
const UserModel = mongoose.model("user", UserSchema);
//                                     ^ collection name

module.exports = UserModel;
