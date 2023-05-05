const db = require("../data/dbConfig");

const findBy = filter => {  
  return db("users")
    .where(filter)
    .first();
};

const getAddressById = id => {
  return db("users")
    .where({ id })
    .select(
      "wowaddress"
  ).first();
};

function finduserById(id) {
  return db("users")
    .where("users.id", "=", id)
    .select("*")
    .first();
}

function finduserByaddress(wowaddress) {
  return db("users")
  .where("users.wowaddress", "=", wowaddress)
  .select("*")
  .first();
}

function finduserByIdescrow(id) {
  return db("user_balance")
    .where("user_balance.user_id", "=", id)
    .select("*")
    .first();
}

function findhistoryByUser(userid) {
  return db("login-history")
    .where("login-history.user_id", "=", userid)
    .select("*");
}

function findbrowsersByUser(userid) {
  return db("authorized-browsers")
    .where("authorized-browsers.user_id", "=", userid)
    .select("*");
}

const createTransaction = async transaction => {
  return db("transaction").insert(transaction, ["id", "hash", "from_address", "to_address", "amount", "description", "txn_type", "userid", "fee","date"]);
};

const createAdminTransaction = async transaction => {
  return db("admin_fee").insert(transaction, ["id", "hash", "from_address", "to_address","fee", "userid","date"]);
};

const createBalance= async balance => {
  return db("user_balance").insert(balance, ["id", "user_id", "totalbalance"]);
};

function getBalance(userid) {
  return db("user_balance")
    .where("user_balance.user_id", "=", userid)
    .select("*").first();
}

const InsertLoginHis = async user => {
  return db("login-history").insert(user, ["id", "type", "datetime", "ipaddress"]);
};

const InsertAuthorizedBrowsers = async user => {
  return db("authorized-browsers").insert(user, ["id", "user_agent", "location", "ipaddress","created_date"]);
};

const updateUserById = async (user) => {
  return db("users")
    .where({ id: user.id })
    .update(user, "*");
};

const accountDeletion = async (user) => {
  return db("users")
    .where({ id: user.id })
    .update(user, "*");
};
   

const Transactiontoadmin = async transaction => {
  return db("transaction_fromadmin").insert(transaction, ["id", "hash", "from_address", "to_address", "amount", "description", "txn_type", "userid", "fee","date","p1_status","admin_status","p2_status"]);
};



function getadminBalance(id) {
  return db("admin_blance")
    .where("admin_id", "=",id)
    .select("*")
    .first();
}
function adminfinduserById(id) {
  return db("admins")
    .where("admins.id", "=", id)
    .select("*")
    .first();
}
const admincreateBalance= async balance => {
  return db("admin_blance").insert(balance, ["id", "admin_id", "totalblance"]);
};

const adminupdateBalanceById = async (balance) => {
  return db("admin_blance")
    .where({ "admin_id": balance.admin_id })
    .update(balance, "*");
};


function getrowdetail(id){
  return db("transaction_fromadmin")
 .where("id","=",id)
 .select("*");
}


function getrowdetailpermission(id){
  return db("transaction_fromadmin")
 .where("id","=",id)
 .where("p1_status","=",1)
 .select("*");
}

const updatetranstionfromadmin= async (user)=> {
  return db("transaction_fromadmin")
    .where( {id: user.id} )
    .update(user,"*");
}

function getlistadmintransfercoin(){
  return db("transaction_fromadmin")
  .select("*")
 
}
function updatep1user(id){
  return db("transaction_fromadmin")
 .where("id","=",id)
 .update("p1_status",1);
}
 
const pone_to_ptwo_transaction = async transaction => {
  return db("p1_to_p2_transaction").insert(transaction, ["id","hash","from_address", "to_address","date","amount","txn_type","description","userid","p1_status","confirmed_date","p2_userid","fiat_amount","maker_id","offer_id","price_bch"]);
};

function finduserByaddres(address) {
  return db("users")
    .where("users.wowaddress", "=", address)
    .select("*")
    .first();
}

function getp2Balance(id) {
  return db("user_balance")
    .where("user_id", "=",id)
    .select("*")
    .first();
}

const p2createBalance= async p2balanceData => {
  return db("user_balance").insert(p2balanceData, ["id", "user_id", "totalbalance"]);
}




const p2dateBalanceById = async (balance) => {
  return db("user_balance")
    .where({ user_id: balance.user_id })
    .update(balance, "*");
};

function getBalancep1(user_id) {
  return db("user_balance")
    .where("user_balance.user_id", "=", user_id)
    .select("*").first();
}

// const findexitp1 = filter => {  
//   return db("p1_to_p2_transaction")
//     .where(filter)
//     .first();
// };

// const findexitp1= async(checkper)=>{
//   return db("p1_to_p2_transaction")
//   .where({ id: checkper.id })
//   .where({userid:checkper.userid})
//   .where({to_address:checkper.to_address})
//   .select().first();
// }

const permission_from_p1 = async (getpermission)=>{
  return db("p1_to_p2_transaction")
  .where({ id: getpermission.id })
  .update(getpermission, "*");
}

// function checkpermission_from_p1(id){
//   return db("p1_to_p2_transaction")
//  .where("userid","=",id)
//  .where("p1_status",1);
// }

// function checkpermission_from_p1(id){
//   return db("p1_to_p2_transaction")
//  .where("userid","=",id)
//  .update("p1_status",1);
// }

const hashupdate = async (hashupdate) => {
  return db("p1_to_p2_transaction")
    .where({id: hashupdate.id })
    .update(hashupdate, "*");
};

const updelrecorddb = async (mdata) => {
  return db("p1_to_p2_transaction")
    .where({id: mdata.id })
    .update(mdata, "*");
};
const getlist_p1_escrow= async(userid)=>{
  // return db("p1_to_p2_transaction")
  // .where({userid: userid })
  // .where({p1_status:0})
  // .where({cancelled_contract:0})
  // .where({closed_contract:0})   
   
  return db("p1_to_p2_transaction")
  .select("p1_to_p2_transaction.*",
  {usermaker:"u1.username"},
  {usertaker:"u2.username"}
  )
  .leftJoin({u1:"users"},"p1_to_p2_transaction.maker_id","=","u1.id")
  .leftJoin({u2:"users"},"p1_to_p2_transaction.userid","=","u2.id")
  .where(function(){
    this.where("p1_to_p2_transaction.userid",userid)
    this.where("p1_to_p2_transaction.p1_status",0)
    this.where("p1_to_p2_transaction.cancelled_contract",0)
    this.where("p1_to_p2_transaction.closed_contract",0)
  })
  .orderBy("p1_to_p2_transaction.id","desc")

}

const getlist_p1_escrow_complate= async(userid)=>{
  return db("p1_to_p2_transaction")
  .where({userid: userid })
  .where({p1_status:1})
}


const get_perticular = async(id) =>{
  return db("p1_to_p2_transaction")
  .where({id: id })
  
}
 
const getrowblance = async(id)=>{
  return db("p1_to_p2_transaction")
  .where({id:id})
  .first();
}

const delrecord= async (id) => {
  return db("p1_to_p2_transaction")
    .where({ id: id })
   .delete({id:id})
};

const getme =async()=>{
  return db("p1_to_p2_transaction")
   .select("*");
}

const findByadmin = filter => {
  return db("users")
    .where(filter)
    .first();
};

const user_to_admin_payment= async p2balanceData => {
  return db("user_to_admin_payment").insert(p2balanceData, ["id","hash","userid", "adminid","amount","status","created_at"]);
}

const addorderdb = async orderadd=>{
  return db("orders").insert(orderadd,["is_maker_buying","maker_id","taker_id","offer_id",
"price_bch","bch_amount","fiat_amount","created_at"]);
}


function getallpayments() { 
  return db("user_to_admin_payment")
  .join('users', 'users.id', '=', 'user_to_admin_payment.userid')
  .select('user_to_admin_payment.id','users.username','amount','hash','Beneficiary_name','Bank_name','Bic_swift_code','National_clearing_code','Iban','status','user_to_admin_payment.created_at')
  .where("user_to_admin_payment.status","=",0)
  .orderBy("user_to_admin_payment.id", "desc");

}

function getallpayments_complate(){
  return db("user_to_admin_payment")
  .join('users', 'users.id', '=', 'user_to_admin_payment.userid')
  .select('user_to_admin_payment.id','users.username','amount','hash','Beneficiary_name','Bank_name','Bic_swift_code','National_clearing_code','Iban','status','user_to_admin_payment.created_at','user_to_admin_payment.update_at')
  .where("user_to_admin_payment.status","=",1)
  .orderBy("user_to_admin_payment.id", "desc");

}


function row_get_details(id){
  return db("user_to_admin_payment")
  .join('users', 'users.id', '=', 'user_to_admin_payment.userid')
  .select('user_to_admin_payment.id','users.username','amount','hash','Beneficiary_name','Bank_name','Bic_swift_code','National_clearing_code','Iban','status','user_to_admin_payment.created_at','user_to_admin_payment.update_at')
  .where("user_to_admin_payment.id","=",id);
}

const admin_change_status = async (upstatus) => {
  return db("user_to_admin_payment")
    .where({id: upstatus.id })
    .update(upstatus, "*");
};


function getpriew(id) {
  return db("user_to_admin_payment")
    .where("user_to_admin_payment.id", "=", id)
    .select("*")
    .where("user_to_admin_payment.status","=",1)
    .first();
}

function getalldatedata() {
  return db("p1_to_p2_transaction")
  .select('id','date','amount','userid')
  .where({p1_status:0,cancelled_contract:0,closed_contract:0})
.orderBy("id", "asc")
.first(); 
}

const delete_p1_p2_transacion = async (id) => {
  return db("p1_to_p2_transaction")
    .where({id: id })
    .delete({id:id})
};
 

const newaddnotification = async addnotify => {
  return db("user_notification").insert(addnotify, ["id","msg","fromuser","touser","type","created_at","status","main_type"]);
};

const newaddnotificationtwo = async addnotify => {
  return db("user_notification").insert(addnotify, ["id","msg","fromuser","touser","type","offer_id","created_at","status","main_type"]);
};

const newaddnotificationthree = async addnotify => {
  return db("user_notification").insert(addnotify, ["id","msg","fromuser","touser","type","offer_id","created_at","status","main_type","to_amount","from_amount"]);
};



const findByadminaddress = filter => {
  return db("users")
    .where(filter)
    .first();
};


function findtherow(id) {
  return db("p1_to_p2_transaction")
  .select("")
  .where({id:id})
  .first(); 
}


const getlastbuy = async(taker_id,offer_id)=>{
  return db("orders")
  .where({taker_id:taker_id,offer_id:offer_id,is_maker_buying:0})
  .select("*")
  .orderBy("id", "Desc")
  .first();
}

const mydelrow =async(id)=>{
  return db("orders")
  .where({id:id})
  .delete({id:id})
}

const firstdetaildb=async(offer_id,meuser,maker_id)=>{
  return db('orders')
  .where({offer_id:offer_id,taker_id:meuser,maker_id:maker_id,check_status:1})
  .first();
}   

const findmatcheddata =async(taker_id,offer_id,maker_id,bch_amount)=>{
  return db('orders')
  .where({offer_id:offer_id,taker_id:taker_id,maker_id:maker_id,bch_amount:bch_amount})
  
}


     
module.exports = {
  findBy,
  createTransaction,
  findhistoryByUser,
  findbrowsersByUser,
  updateUserById,
  accountDeletion,
  InsertLoginHis,
  InsertAuthorizedBrowsers,
  createBalance,
  getBalance,
  createAdminTransaction,
  getAddressById,
  finduserById,
  Transactiontoadmin,
  getadminBalance,
  adminfinduserById,
  admincreateBalance,
  adminupdateBalanceById,
  getrowdetail,
  getrowdetailpermission,
  updatetranstionfromadmin,
  updatep1user,
  getlistadmintransfercoin,
  pone_to_ptwo_transaction,
  finduserByaddres,
  getp2Balance,
  p2createBalance,
  p2dateBalanceById,
  getBalancep1,
  permission_from_p1,
  hashupdate,
  getlist_p1_escrow,
  getlist_p1_escrow_complate,
  get_perticular,
  finduserByIdescrow,
  getrowblance,
  delrecord,
  findByadmin,
  user_to_admin_payment,
  getallpayments,
  admin_change_status,
  getpriew,
  getallpayments_complate,
  getalldatedata,
  delete_p1_p2_transacion,
  row_get_details,
  getme,
  addorderdb,
  finduserByaddress,
  newaddnotification,
  findByadminaddress,
  findtherow,
  newaddnotificationtwo,
  getlastbuy,
  mydelrow,
  firstdetaildb,
  newaddnotificationthree,
  findmatcheddata,
  updelrecorddb
};
