const express = require("express");
const walletControllers = require("./walletControllers");
const { validateUser } = require("./walletHelper");
const checkLoggedIn = require("../middlewares/restrictedMiddleware")

const router = express.Router();
router.get("/getaddress/:id([0-9]+)", walletControllers.GetAddress);
router.post("/sendcoin", walletControllers.SendCoin);

//p1 access to p2
router.post("/p1_permission_p2/:id([0-9]+)",walletControllers.p1_permission_p2)


//get list of p1 send to amount
router.get("/p1_list_escrocoin/:id([0-9]+)",walletControllers.p1_list_escrocoin);

//get list of p1 send to amount
router.get("/p1_list_escrocoin_complate/:id([0-9]+)",walletControllers.p1_list_escrocoin_complate);

 
//get list of p1 send to amount
router.get("/p1_list_escrocoin_perticular/:id([0-9]+)",walletControllers.p1_list_escrocoin_perticular);

    
//delete trade delete escrow blance

router.get("/delete_transaction_from_p1/:id([0-9]+)",walletControllers.delete_transaction_from_p1);

//send coin and bank deteils from user to admin
router.post('/user_send_coin_bankdetail_admin',walletControllers.user_send_coin_bankdetail_admin);

//get all user amountsend list with banksetails
router.get('/getdetails_user_admin_amount',walletControllers.getdetails_user_admin_amount);

//get all user admin send amount list
router.get('/getdetails_admin_send_amount_complate',walletControllers.getdetails_admin_send_amount_complate);


//change status 1 of transfer amount
router.post("/admin_payment_send_user_confirm/:id([0-9]+)",walletControllers.admin_payment_send_user_confirm);

//perticular record get of transaction 
router.get("/perticular_row_transaction/:id([0-9]+)",walletControllers.perticular_row_transaction);

router.get('/getalldata',walletControllers.getalldata);

//router get and delete last buy trade
router.post("/buy_get_last_trade",walletControllers.buy_get_last_trade);


module.exports = router;
    