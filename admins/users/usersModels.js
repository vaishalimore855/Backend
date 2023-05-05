const db = require("../../data/dbConfig");

const findBy = filter => {
  return db("users")
    .where(filter)
    .first();
};

function finduserById(id) {
  return db("users")
    .where("users.id", "=", id)
    .select("*")
    .first();
};

const createUser = async user => {
  return db("users").insert(user, ["id", "email", "username"]);
};

const updateUserById = async (user) => {
  return db("users")
    .where({ id: user.id })
    .update(user, "*");
};

const ActiveDeactiveuser = async (user) => {
  return db("users")
    .where({ id: user.id })
    .update(user, "*");
};

// function findUsers() {
//   return db("users")
//   .where({ delete_status: 0 })
//     .select("*")
//     .orderBy("users.id", "desc");
// };

function findUsers(getmylist) {
  return db("users")
.where('users.delete_status', "=", getmylist.delete_status)
.where('users.user_type', "=",getmylist.user_type)
  .select("*")  
  .orderBy("users.id", "desc");             
}

function findDeleteUsers() {
  return db("users")
   .where({ delete_status: 1 })
    .select("*");
};

const accountDeletion = async (user) => {
  return db("users")
    .where({ id: user.id })
    .update(user, "*");
};

const createBalance= async balance => {
  return db("user_balance").insert(balance, ["id", "user_id", "totalbalance"]);
};

const updateBalanceById = async (balance) => {
  return db("user_balance")
    .where({ user_id: balance.user_id })
    .update(balance, "*");
};

function getBalance(user_id) {
  return db("user_balance")
    .where("user_balance.user_id", "=", user_id)
    .select("*").first();
}

module.exports = {
  findBy,
  finduserById,
  updateUserById,
  findUsers,
  findDeleteUsers,
  accountDeletion,
  ActiveDeactiveuser,
  createUser,
  createBalance,
  updateBalanceById,
  getBalance
};
