const express = require("express");
const usersControllers = require("./usersControllers");

const router = express.Router();

router.get("/getalluser", usersControllers.GetAllUser);
router.get("/getalldeleteuser", usersControllers.GetAllDeleteUser);
router.get("/useraccount/:id([0-9]+)", usersControllers.GetAccount);
router.post("/adduser", usersControllers.AddUser);
router.post("/updateuser", usersControllers.UpdateUser);
router.post("/deleteuser", usersControllers.Userdelete);
router.post("/activeuser", usersControllers.ActiveUser);
router.post("/deactiveuser", usersControllers.DeactiveUser);
router.get("/getuserbalance/:user_id([0-9]+)", usersControllers.getBalance);
     
module.exports = router;


