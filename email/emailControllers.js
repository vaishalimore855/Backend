require("dotenv").config();
const bcrypt = require("bcryptjs");
const Verification = require("./emailModels");
const { generateToken } = require("./emailHelper");
var nodemailer = require('nodemailer');

exports.SendEmail = async (req, res) => {
  try {

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "mail.cyperts.net",
        port: 587,
        rejectUnauthorized:false,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "trupti@cyperts.net", // generated ethereal user
          pass: "trupti@721", // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false
      }
      });
      
      // send mail with defined transport object
        let info = await transporter.sendMail({
        from: '"Chetna 👻" <chetna.musale@cyperts.net>', // sender address
        to: "trupti@cyperts.net", // list of receivers
        subject: "Hello Chetna ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
   
  } catch (error) {
   console.log("Email Error", error)
    res.status(500).json({
      errorMessage: "Oops, something went wrong while registering",
      error,
    });
  }
};






