const express = require("express");
const emailControllers = require("./emailControllers");
const { validateUser } = require("./emailHelper");

const router = express.Router();

router.post("/sendemail", emailControllers.SendEmail);


module.exports = router;
