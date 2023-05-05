require("dotenv").config();
const bcrypt = require("bcryptjs");
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const crypto = require('crypto');
const User = require("./usersModels");
var nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const { Console } = require("console");



exports.setreferral = async (req, res) => {
  try {
    const { useraddress, referraladdress } = req.body;

    const referralExist = await User.findBy({
      useraddress: useraddress,
      referraladdress: referraladdress,
    });

    if (referralExist)
    res.status(409).json({
      errorMessage: "Oops, referralExist already exists",
    });
    
    const checklevel = await User.findBy({
      useraddress: referraladdress
    });
    if(checklevel){
      ranklevel = "R2";
      bonus= 7; 
      referralref= checklevel.referraladdress;
     const leveldata = {
      useraddress:useraddress,
      referraladdress:referralref,
      ranklevel: ranklevel,
      bonus
      };
      const [referralUser] = await User.createUser(leveldata);
     }

    ranklevel = "R1";
    bonus= 10
    const credentials = {
      useraddress,
      referraladdress,
      ranklevel,
      bonus
    };
    

    if(credentials){
      const [newUser] = await User.createUser(credentials);
      
      res.status(201).json({
        message: "User referral created successfully",
        user: newUser
      }); 
    }
    else{
      res.status(201).json({
        message: "Something Went Wrong",
       
      });
    }
   } catch (error) {
      console.log(error)
    res.status(500).json({
      errorMessage: "Oops, something went wrong while registering",
      error,
    });
  }
};

exports.getreferral = async (req,res) =>{
  try {

    const { useraddress } = req.body;
    const alltrustuser = await User.finduserByaddress(useraddress);
    if(alltrustuser){
      return res.status(200).json({
        message:'Trust User List',
        trustusers:alltrustuser
      });
    }
    else{
      return res.status(400).json({
        message:'No Trust User Found'
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error });
  }
}

