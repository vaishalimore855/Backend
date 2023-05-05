require("dotenv").config();
const Wallet = require("./walletModels");
const { generateToken } = require("./walletHelper");
var Web3 = require('web3');
const fetch   = require('node-fetch');
const { as } = require("../data/dbConfig");
const router = require("../users/usersRoutes");
const cron = require("node-cron");
const date = require('date-and-time');

const now = new Date();
const dateenter=date.format(now,"MMMM DD,YYYY");
const today = new Date();
const todaydate = dateenter+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        


//////var todaydate = date.format(now, 'MM/DD/YYYY');

////var todaydate  = date.format(now, 'YYYY/MM/DD HH:mm:ss');

// var todaydate=date.format(now,"MMMM DD,YYYY HH:mm:ss");




const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "_Freezelisted", "type": "address" }], "name": "AddToFreezelist", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "tokenOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "_whitelisted", "type": "address" }], "name": "RemoveFromFreezelist", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "Freezelistaddress", "type": "address" }], "name": "addtoFreezelist", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "who", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "remaining", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenOwner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "balance", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "chnageOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "whitelistaddress", "type": "address" }], "name": "removefromFreezelist", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "showstateofuser", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];

var TEST_NET = 'https://data-seed-prebsc-1-s1.binance.org:8545';
var TEST_NET_ADDRESS = '0x41f6d4577A5857507F8e7cA756129124F0CCb2E6';
var web3 = new Web3(new Web3.providers.HttpProvider(TEST_NET));
let WowContract = new web3.eth.Contract(abi, TEST_NET_ADDRESS);
//let Adminpublickey = "0x5d68917c0f775Bc0360028d5545c4e370854D9B2";
//let Adminpublickey="0xaB6c6771dA7684Bcb0143056f83801a48A0693fD";
//let Adminpublickey="0xbC7E5144c96e43E8f758a7D4F6DF1C45fFbB6B0d";
let gasmax = 2000000;
//  let privatekey = "d66c0702691ee1eb99d5b6a861b938bffe02430bc3219bee509f1bbedb506180";


// let admin_privetkey="bc373efcb56c50e5c7bfece529ce5fb1974482551111eb9b6c5687c9b0d5dc7e"

exports.GetAddress = async (req, res) => {
  const { id } = req.params;
  try {    
    const Address = await Wallet.getAddressById(id);
    return res.status(200).json(Address);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.SendCoin = async (req, res) => {
  try {
    const _address = req.body.address;   
    const fee = req.body.fee;
    const amount = req.body.amount;
    const famount = amount-fee;
    const _finalamount = web3.utils.toWei(
      famount.toString(),
      'ether'
     );

     const _fee = web3.utils.toWei(
      fee.toString(),
      'ether'
      );   

    const userid = req.body.user_id;
    const description = req.body.description;
    const txn_type = req.body.type;
    const user = await Wallet.finduserById(userid);
    const _privatekey = user.privateKey;
    let date = new Date();
		
if(user.wowaddress==_address){
  return res.status(400).json({
    errorMessage: "You not send coin Own Address",
  });
}
    const gettouser =await Wallet.finduserByaddress(_address);
         
    if(!gettouser){
      return res.status(400).json({
        errorMessage: "Something went wrong",
      }); 
    }

    const fromuser=userid; 
    const touser=gettouser.id;
    const type="Transaction";
    const formname =user.username;
    const created_at=new Date().toISOString().slice(0, 10);
    const status="0";
    const main_type="noti_";

    const msg="Wowcoin received from"+" "+formname;
    const getadmin = await Wallet.findByadminaddress({user_type:'admin' });
   const adminwowaddress=getadmin.wowaddress;


    const weiBalance= await WowContract.methods.balanceOf(user.wowaddress).call();
    let totalbalance = web3.utils.fromWei(weiBalance, 'ether');
    if (totalbalance < amount) {
      return res.status(400).json({
        errorMessage: "insufficient funds on your address",
      });
    }

    if (amount < fee) {
      return res.status(400).json({
        errorMessage: "Please enter the amount gether than fee",
      });
    }


    Gas = await WowContract.methods.transfer(_address,_finalamount).estimateGas({from :user.wowaddress ,gas: gasmax});
    Gas = Gas==gasmax ? gasmax: Gas;

    GasPrice = await web3.eth.getGasPrice();
    // hexString = '0x' + (GasPrice+0x10000).toString(16).substr(-4).toUpperCase();
    let newgas= parseInt(GasPrice) * 100;
    const hexString =  '0x'+newgas.toString(16);
   
   let methodEncodeAbi = await WowContract.methods.transfer(_address,_finalamount).encodeABI();
   const rawTx = {
			to: TEST_NET_ADDRESS,
			data: methodEncodeAbi,
			gas : Gas,
      gasPrice : hexString
		};

		web3.eth.getChainId().then();
      let fn = async () => {
			let myres = await web3.eth.accounts.signTransaction(rawTx,_privatekey);
			await web3.eth.sendSignedTransaction(myres['rawTransaction']);
			let transactiondata = await web3.eth.getTransactionReceipt(myres['transactionHash']);
      let from_address = transactiondata.from;
      let to_address = _address;
      let hash = transactiondata.transactionHash;
       const TransactionData = {
            hash,
            from_address,
            to_address,
            date, 
            amount,
            description,
            txn_type,
            userid,
            fee
          };
          const newTransaction = await Wallet.createTransaction(TransactionData);
                            //add notification
     
             };
             await fn();

          let AdminmethodEncodeAbi = await WowContract.methods.transfer(adminwowaddress,_fee).encodeABI();
          const AdminrawTx = {
            to: TEST_NET_ADDRESS,
            data: AdminmethodEncodeAbi,
            gas : Gas,
            gasPrice : hexString
          };
          web3.eth.getChainId().then();
            let adminfn = async () => {
              let adminmyres = await web3.eth.accounts.signTransaction(AdminrawTx,_privatekey);
            await web3.eth.sendSignedTransaction(adminmyres['rawTransaction']);
            let transactiondata = await web3.eth.getTransactionReceipt(adminmyres['transactionHash']);
            let from_address = transactiondata.from;
            let to_address = transactiondata.to;
            let hash = transactiondata.transactionHash;
             const AdminTransactionData = {
                  hash,
                  from_address,
                  to_address,
                  date, 
                  userid,
                  fee
                };
                   const AdminTransaction = await Wallet.createAdminTransaction(AdminTransactionData);

                   const addntification ={
                    msg,
                    fromuser,
                    touser,
                    type,
                    status,
                    created_at,
                    main_type
                  }
                  const addnotificationsend = await Wallet.newaddnotification(addntification);
                  
 
  res.status(201).send({ success: true, message:"Transaction Successfull" });

                };
                await adminfn();
      

		
   } catch (error) {
         console.log(error)
         res.status(400).send({ success: false, error:error });
    }
};



exports.p1_permission_p2 = async(req,res)=>{

  
  try {

    const today1 = new Date();
     const todaydate2 = dateenter+' '+today1.getHours() + ":" + today1.getMinutes() + ":" + today1.getSeconds();


   
    const userid = req.body.userid;
  const id = req.params.id;
  const to_address = req.body.to_address;
  const amount=req.body.amount;

  

  if(!userid=='' && !id=='' && !to_address==''){

const p1_status="1";
const confirmed_date=todaydate2;
const getpermission={
   id,
  p1_status,
  confirmed_date
};

const check_permission =await  Wallet.permission_from_p1(getpermission)

if(check_permission){
const _finalamount = web3.utils.toWei(
  amount.toString(),
  'ether'
 );
 const user = await Wallet.finduserById(userid);
 const _privatekey = user.privateKey;
 let date = new Date();   
 const weiBalance= await WowContract.methods.balanceOf(user.wowaddress).call();
 const totalbalance = web3.utils.fromWei(weiBalance, 'ether');
 
//  const user_escro_bal=await Wallet.finduserByIdescrow(userid);
// const get_escro_bal = user_escro_bal.escrowbalance;
// const totalblance1 =totalbalance + Number(get_escro_bal);


 if (totalbalance < amount) {
   return res.status(400).json({
     errorMessage: "insufficient funds on your address",
   });
 }
 Gas = await WowContract.methods.transfer(to_address,_finalamount).estimateGas({from :user.wowaddress ,gas: gasmax});
 Gas = Gas==gasmax ? gasmax: Gas;

 GasPrice = await web3.eth.getGasPrice();
 // hexString = '0x' + (GasPrice+0x10000).toString(16).substr(-4).toUpperCase();
 let newgas= parseInt(GasPrice) * 100;
 const hexString =  '0x'+newgas.toString(16);

let methodEncodeAbi = await WowContract.methods.transfer(to_address,_finalamount).encodeABI();
   console.log(methodEncodeAbi,'methodEncodeAbi')
const rawTx = {
   to: TEST_NET_ADDRESS,
   data: methodEncodeAbi,
   gas : Gas,
   gasPrice : hexString
 };

 web3.eth.getChainId().then();
   let fn = async () => {
   let myres = await web3.eth.accounts.signTransaction(rawTx,_privatekey);
   await web3.eth.sendSignedTransaction(myres['rawTransaction']);
   let transactiondata = await web3.eth.getTransactionReceipt(myres['transactionHash']);
   let from_address = transactiondata.from;
   //let to_address = _address;
   let hash = transactiondata.transactionHash;

   const userdata = await Wallet.getBalancep1(userid);
   const escrowbalance = Number(userdata.escrowbalance) - Number(amount);
    const user_id = req.body.userid


  const blanceamount={
    user_id,
    escrowbalance
  };
 const amount_minus= await Wallet.p2dateBalanceById(blanceamount);
  const closed_contract=1;
  const closed_cancelled_date=todaydate2;
  const perform_by="Self";

 const hashupdate={
  id,
  hash,
  closed_contract,
  closed_cancelled_date,
  perform_by
};
const hash_update= await Wallet.hashupdate(hashupdate);


const getdetailno=await Wallet.findtherow(id);
const touser = getdetailno.maker_id;
const offer_id = getdetailno.offer_id;

const user = await Wallet.finduserById(userid);
const fromuser=userid;
  const type="Approve"
  const formname =user.username;
  const created_at=new Date().toISOString().slice(0, 10);;
  const status="0";
  
  const msg="Trade#"+" "+offer_id+" "+"released escrow from"+" "+formname;
  const main_type="noti_";

  const addntification ={
    msg,
    fromuser,
    touser,
    type,
    offer_id,
    status,
    created_at,
    main_type
  }
  const addnotification = await Wallet.newaddnotificationtwo(addntification);


      // const newTransaction = await Wallet.createTransaction(TransactionData);
       res.status(201).send({ success: true, message:"Transaction Successfull" });
          };
          await fn();


}
else{
  res.status(400).json({
    seccess:'false',
    message:'something went wrong'
    });
}

  }
  else{
    res.status(400).json({
    seccess:'false',
    message:'something went wrong'
    });
  }

  } catch (error) {
    console.log(error)
    res.status(400).send({ success: false, error:error });
  }

};


exports.p1_list_escrocoin = async(req,res)=>{
  try { 
    var userid= req.params.id; 
     

    const get_escro_list = await Wallet.getlist_p1_escrow(userid);

    if(get_escro_list.length > 0){
      res.status(200).json({
      success:'true',
      message:'Waiting Approvel List',
      data:get_escro_list
      });
    }
    else{
      res.status(200).json({
        message:'No List',
        success:'false'
        });
    }
    
  } catch (error) {
    console.log(error)
    res.status(400).send({ success: false, error:error });

  }
}

exports.p1_list_escrocoin_complate = async(req,res)=>{
  try {
    var userid= req.params.id;;

    const get_escro_list_complate = await Wallet.getlist_p1_escrow_complate(userid);

    if(get_escro_list_complate.length > 0){
      res.status(200).json({
      success:'true',
      message:'Complate List',
      data:get_escro_list_complate
      });
    }
    else{
      res.status(200).json({
        message:'No List',
        success:'false'
        });
    }
    
  } catch (error) {
    console.log(error)
    res.status(400).send({ success: false, error:error });

  }
}

exports.p1_list_escrocoin_perticular = async(req,res)=>{
  try {
    var id= req.params.id;

    const get_perticular =await Wallet.get_perticular(id);

    if(get_perticular.length > 0){
      res.status(200).json({
      success:'true',
      message:'Data Is ',
      data:get_perticular
      });
    }
    else{
      res.status(200).json({
        message:'No Data Found',
        success:'false'
        });
    }
    
  } catch (error) {
    console.log(error)
    res.status(400).send({ success: false, error:error });

  }
}









 





exports.delete_transaction_from_p1 = async(req,res)=>{
  try {
   const id=req.params.id;
   
if(!id){
  return res.status(400).json({
  msg:'Something Went Wrong',
  status:'false'
  });
}


 const getdetaillist = await Wallet.getrowblance(id);



  
 if(!getdetaillist){
  return res.status(400).json({
  msg:'Something Went Wrong',
  status:'false'
  });
}
  var amount = getdetaillist.amount;
  const user_id=getdetaillist.userid;


  const user_escro_bal=await Wallet.finduserByIdescrow(user_id);
  const get_escro_bal = user_escro_bal.escrowbalance;

  const escrowbalance11 = Number(get_escro_bal) - Number(amount)
 const escrowbalance=escrowbalance11
 

 const blanceamount={      
   user_id,
   escrowbalance
 }; 
const amount_minus= await Wallet.p2dateBalanceById(blanceamount);

// const delrecord = await Wallet.delrecord(id);
const closed_cancelled_date=todaydate;
const cancelled_contract=1;
const perform_by="Self";

const updelprecord={
  id,
  cancelled_contract,
  closed_cancelled_date,
  perform_by
};
 const updelrecord = await Wallet.updelrecorddb(updelprecord);

const touser = getdetaillist.p2_userid;
const offer_id = getdetaillist.offer_id;
// const amount=getdetaillist.amount;
  const user = await Wallet.finduserById(getdetaillist.userid);
const fromuser=getdetaillist.userid;
  const type="Cancel"
  const formname =user.username;
  const created_at=new Date().toISOString().slice(0, 10);;
  const status="0";
  //const msg="amount"+" "+amount+" "+"is Cancel"+" "+formname+" "+'for offer'+" "+offer_id+" at"+" "+created_at;

  const msg="Trade#"+" "+offer_id+" "+"canceled from"+" "+formname;
  const main_type="noti_";

  const addntification ={
    msg,
    fromuser,
    touser,
    type,
    offer_id,
    status,
    created_at,
    main_type
  }
  const addnotification = await Wallet.newaddnotificationtwo(addntification);

if(amount_minus && updelrecord  && addnotification){
  res.status(200).json({
   msg:'Success',
   status:'true'
  });
}else{
  res.status(200).json({
    msg:'Fail',
    status:'false'
   });
}

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error });
  
  }
}


////send coin and bank deteils from user to admin
exports.user_send_coin_bankdetail_admin = async(req,res)=>{
  try {
    const userid = req.body.userid.trim();
    const adminget = await Wallet.findByadmin({user_type:'admin' });
   
    if(!adminget.wowaddress){
      return res.status(400).json({
      msg:'Something went wrong',
      status:'false'
      });
    }
    const adminid = adminget.id;
     const adminaddress =  adminget.wowaddress;
     const status='0';
     const created_at=new Date().toISOString().slice(0, 10);
     const amount= req.body.amount.trim();
const userget = await Wallet.finduserById(userid)
 
  if(adminget.wowaddress && userget.wowaddress && userget.privateKey && userget.Beneficiary_name && userget.Bank_name && userget.Bic_swift_code && userget.National_clearing_code && userget.Iban )
  {

    const _address = adminaddress;   
    const famount = amount;
    const _finalamount = web3.utils.toWei(
      famount.toString(),
      'ether'
     );
    const _privatekey = userget.privateKey
		

    const weiBalance= await WowContract.methods.balanceOf(userget.wowaddress).call();
    let totalbalance = web3.utils.fromWei(weiBalance, 'ether');
    if (totalbalance < amount) {
      return res.status(400).json({
        errorMessage: "insufficient funds on your address",
      });
    }

    


    Gas = await WowContract.methods.transfer(_address,_finalamount).estimateGas({from :userget.wowaddress ,gas: gasmax});
    Gas = Gas==gasmax ? gasmax: Gas;

    GasPrice = await web3.eth.getGasPrice();
    // hexString = '0x' + (GasPrice+0x10000).toString(16).substr(-4).toUpperCase();
    let newgas= parseInt(GasPrice) * 100;
    const hexString =  '0x'+newgas.toString(16);
   
   let methodEncodeAbi = await WowContract.methods.transfer(_address,_finalamount).encodeABI();
	    console.log(methodEncodeAbi,'methodEncodeAbi')
   const rawTx = {
			to: TEST_NET_ADDRESS,
			data: methodEncodeAbi,
			gas : Gas,
      gasPrice : hexString
		};

		web3.eth.getChainId().then();
      let fn = async () => {
			let myres = await web3.eth.accounts.signTransaction(rawTx,_privatekey);
			await web3.eth.sendSignedTransaction(myres['rawTransaction']);
			let transactiondata = await web3.eth.getTransactionReceipt(myres['transactionHash']);
      let from_address = transactiondata.from;
      let to_address = _address;
      let hash = transactiondata.transactionHash;
         const add_payment={
            hash,
           userid,
           adminid,
           amount,
           status,
          created_at,
              }
         const add = await Wallet.user_to_admin_payment(add_payment);
         res.status(201).send({ success: true, message:"Transaction Successfull" });

             };
             await fn();

  }
  else{
    res.status(400).json({
      msg:'Sorry , Bank Detail is not complte',
      status:'false'
      });
  }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error }); 
  }
}



exports.getdetails_user_admin_amount = async(req,res)=>{

  try {
    var getdetails = await Wallet.getallpayments();

    if(getdetails.length > 0){
    res.status(200).json({
    msg:'List Is',
    status:'true',
    data:getdetails
    });
    }
    else{
      res.status(200).json({
        msg:'List Is Not Found',
        status:'false',
      
        });
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error }); 
  }
}


exports.getdetails_admin_send_amount_complate = async(req,res)=>{
  try {
    const getdetails = await Wallet.getallpayments_complate();

    if(getdetails.length > 0){
    res.status(200).json({
    msg:'List Is Complate Transfer Amount To Users',
    status:'true',
    data:getdetails
    });
    }
    else{
      res.status(200).json({
        msg:'List Is Not Found',
        status:'false',
      
        });
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error }); 
  }
}



exports.admin_payment_send_user_confirm = async(req,res)=>{
  try {
    const id = req.params.id;
    const status="1";
     const update_at=new Date().toISOString().slice(0, 10);
      
    if(!id){
      return res.status(200).json({
       msg:'Something Went Wrong',
       status:'false'
      });
    } 

const getpeivew = await Wallet.getpriew(id);
if(getpeivew)
{
  return res.status(200).json({
    msg:'Record Allready Update',
    status:'false'
   });
}
else{
    const updatedata={
      id,
      status,
      update_at
    }
    
const saveandupdate = await Wallet.admin_change_status(updatedata);

if(saveandupdate){
res.status(200).json({
msg:'Record Is Update',
status:'true'
});
}
else{
  res.status(200).json({
    msg:'Sorry Record Is Not Update',
    status:'false'
    });
}
}
  } catch (error) {
    console.log(error)
    return res.status(500).json({error})
  }
}


exports.perticular_row_transaction = async(req,res)=>{
  try {
    const id =req.params.id;
    var getdetails = await Wallet.row_get_details(id);
     
    if(getdetails.length > 0){
    res.status(200).json({
    msg:'Row Data IS',
    status:'true',
    data:getdetails
    });
    }
    else{
      res.status(200).json({
        msg:'DataIs Not Found',
        status:'false',
        });
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error }); 
  }
}


// Creating a cron job  to delete transaction not complate in 3 hours
// cron.schedule("*/1 * * * * ", async()=> {
  

// var now1 = new Date();
// var dateentersecond=date.format(now1, "MMMM DD,YYYY");
// var today = new Date();
//  var date2 = dateentersecond+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

//   const gettime = await Wallet.getalldatedata();
//   if(gettime){
//    var dt1=new Date(gettime.date);

//      var dt2=new Date(date2);
//   var diff =  (dt2.getTime() - dt1.getTime()) / 1000;
//   var seconddiff = Math.abs(diff / 60);
//    var differntminite=Math.abs(Math.round(seconddiff));
//   //var differntminite=Math.ceil(seconddiff);
//   console.log(differntminite,'sd')
//         if(differntminite >= 90){
//       const id=gettime.id;
//       const p1_status='1';
//       const user_id = gettime.userid;
//       const withamount=gettime.amount;

//       const balescrow=await Wallet.getBalancep1(user_id);
//       const getbal=balescrow.escrowbalance;
//       const escrowbalance = Number(getbal) - Number(withamount);
//        const updata={
//         user_id,
//         escrowbalance
//        }
//        const escrowbalminus=await Wallet.p2dateBalanceById(updata);
//     //  console.log(escrowbalminus,'escrowbalminus')
//        if(escrowbalminus)
//         {
//         //  const ss= await Wallet.delete_p1_p2_transacion(id);
//     //       const updelprecord={
//     //                   id,
//     //           cancelled_contract
//     //             };
//     //  const updelrecord = await Wallet.updelrecorddb(updelprecord);
//     const cancelled_contract=1;
//     const closed_cancelled_date=todaydate;
//     const perform_by="Automatic"
// const updelprecord={
//   id,
//   cancelled_contract,
//   closed_cancelled_date,
//   perform_by
// };
//  const updelrecord = await Wallet.updelrecorddb(updelprecord);


//         }
//         }
//         else{
//      console.log('not Complate 90 minute')
//         }
//       }
//       else{
//         console.log('next_time')
//       }

// });

exports.getalldata=async(req,res)=>{
try {
  
  var now1 = new Date();
  var dateentersecond=date.format(now1, "MMMM DD,YYYY");
  var today = new Date();

   var date2 = dateentersecond+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  

  const getme =await Wallet.getme();

 console.log(getme)

  if(getme){
    res.status(200).json({
      msg:'data',
      todaydt:date2,
      data:getme
    });
  }
  else{
    res.status(200).json({
      msg:'no data',
    });
  }
  
} catch (error) {
  console.log(error);
  res.json(err);
}
}


///buy_get_last_trade
exports.buy_get_last_trade = async(req,res)=>{
  try {

    const taker_id=req.body.userid;
    const offer_id = req.body.offerid;           

    const getlastbuydata=await Wallet.getlastbuy(taker_id,offer_id);

    if(getlastbuydata){ 
      const delid=getlastbuydata.id;

      const touser = getlastbuydata.maker_id;
      var desidetype="Buy Trade Cancel";
      
       
       const user1 = await Wallet.finduserById(taker_id);
      const fromuser=taker_id;
          const type="Buy_Trade_Cancel";
          const formname =user1.username;
          const created_at=new Date().toISOString().slice(0, 10);;
          const status="0";
          // const msg=formname+" "+"is"+" "+desidetype +" "+'for offer Id'+" "+offer_id+" at"+" "+created_at;

          const msg="Trade#"+" "+offer_id+" "+desidetype+" "+"from"+" "+formname;
          const main_type="noti_";

          const addntification ={
            msg,
            fromuser,
            touser,
            type,
            offer_id,
            status,
            created_at,
            main_type
          }
          const addnotification = await Wallet.newaddnotificationtwo(addntification);
      const delrow = await Wallet.mydelrow(delid);
      if(addnotification && delrow){
        res.status(200).json({
          msg:'Buy Trade Order Is Cancel',
          status:'True',
          data:getlastbuydata
          });
      }
      else{
        res.status(400).json({
          msg:'Something went wrong',
          status:'false'
          });
      }
    }
    else{
      res.status(400).json({
      msg:'Something went wrong',
      status:'false'
      });
    }
     
  } catch (error) {
    console.log(error);
    res.json(err);
  }
}


