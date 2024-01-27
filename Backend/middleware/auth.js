const jwt = require('jsonwebtoken')

const UserModel = require('../models/User')


const admin_auth = async(req,res,next)=>{
    // console.log('hello admin');
   try{
    const{token} = req.cookies
    // console.log(token);
    const verify_token = jwt.verify(token,"vishalbhagat2002")
    // console.log(verify_token);
    const admin_data = await UserModel.findOne({_id:verify_token.id})
    // console.log(admin_data);
    req.user = admin_data
       next()
   }
   catch(err){
    res.redirect('/login');
   }
 }

module.exports = admin_auth