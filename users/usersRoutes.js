const express = require("express");
const usersControllers = require("./usersControllers");
const { validateUser } = require("./usersHelper");
const {emailauthtoken} = require("./usersHelper");
const {checkverified} = require("./usersHelper");

const router = express.Router();
const checkLoggedIn = require("../middlewares/restrictedMiddleware")
  
router.post("/userreferral", usersControllers.setreferral);
router.post('/getreferral',usersControllers.getreferral)

module.exports = router;
 