require("dotenv").config();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const db = require("../data/dbConfig");
const User = require("./usersModels");

const secret = process.env.JWT_SECRET || "default";

const generateToken = (username, id) => {
  const token = jwt.sign(
    {
      username,
      userId: id
    },
    secret,
    { expiresIn: "24h" }
  );
  return token;
}; 

const validateUser = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .trim(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Please add a password with at least 6 characters long.")
    .trim(),
  check("username")
    .isLength({ min: 2 })
    .withMessage("Please add an username with at least 2 characters long.")
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);
   if (!errors.isEmpty()) {
      const Message = {};
      errors.array().forEach(i => {
        Message[i.param] = i.msg;
      });
      const errorMessage = Message;
      res.status(400).json({
        status:409,
        errorMessage
      });
    } else next();
  }
];


var emailauthtoken =function(req,res,next){
  try {
      var token=req.query.token;
      var decode = jwt.verify(token,'secret');
      req.userdata=decode;
      next();   
      
  } catch (error) {
      res.status(401).json({
          // error:error,
          message:'Sorry You Can Not Verifying Your Account'
          });
  }

}

var checkverified=async(req,res,next) =>{
  const { username, password } = req.body;

     var userone = await User.findBy({username,email_verification:1});
     
   if (userone) {
    next();
   }
   else{
    // res.status(400).json({errorMessage: "Oops, Email Not Verified Please Email Verified Then Login Your Account"});
    res.status(400).json({errorMessage: "Oops, This Account Email Is Not Verified"});
}
}



module.exports = {
  generateToken,
  validateUser,
emailauthtoken ,
checkverified,

};
