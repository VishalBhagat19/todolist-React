const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserController {
  static userregister = async (req, res) => {
    
    try {
      

      const { name, email, password, cpassword } = req.body;
      const user = await UserModel.findOne({ email: email });
      if (user) {
        res.status(401).json({
          message: "Email already exists",
        });
      } else {
        if (name && email && password && cpassword) {
          if (password == cpassword) {
            try {
              const hashpassword = await bcrypt.hash(password, 10);
              const result = new UserModel({
                name: name,
                email: email,
                password: hashpassword,
               
              });
              await result.save();
              res.status(201).json({
                message: "Registration Successful :)",
                result,
              });
            } catch (err) {
              console.log(err);
            }
          } else {
            res.status(401).json({
              message: "password and confirm password doesnt match",
            });
          }
        } else {
          res.status(401).json({
            message: "All fields are required",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  static verifylogin = async (req, res) => {
    try {
      
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        if (user != null) {
          const ismatched = await bcrypt.compare(password, user.password);
          if (user.email == email && ismatched) {
           
            const token = jwt.sign({ id: user._id }, "vishalbhagat2002");
            
            res.cookie("token", token);
            
              

            res.status(201).json({
              status: "success",
              message: "login successfully with web token 😃🍻",
              token: token,
              user,
          
            });
            
          } else {
            res.status(401).json({
              message: "email or password not matched",
            });
          }
        } else {
          res.status(401).json({
            message: "You are not registered",
          });
        }
      } else {
        res.status(401).json({
          message: "All Fields are required",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  static displayuser = async (req, res) => {
    const users = await UserModel.find();
    res.status(201).json({
      success: true,
      message: "You get all users",
      users,
    });
  };

 
}
module.exports = UserController;
