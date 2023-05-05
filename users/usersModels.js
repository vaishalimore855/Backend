const db = require("../data/dbConfig");

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
}

function finduserByaddress(user) {
  return db("users")
    .where("users.useraddress", "=",user.useraddress)
    .select("*")
    .first();
}

const createUser = async user => {
  return db("users").insert(user, ["id", "useraddress", "referraladdress"]);
};


module.exports = {
  findBy,
  createUser,
  finduserById,
  finduserByaddress
};
