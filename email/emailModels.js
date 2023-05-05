const db = require("../data/dbConfig");

const createVerification = async identification => {
  return db("tier1_identification").insert(identification, ["id","occupation","nationality","service","business","userid"]);
};

const createAddress = async address => {
  return db("tier1_address").insert(address, ["id","addressline1","addressline2","city","state","country","postalcode","userid"]);
};

const createOfficialPhotoid = async address => {
  return db("official_photo_id").insert(address, ["id","passport","license","identitycard","residencepermit","userid"]);
};

function findOfficialPhotoid(id) {
  return db("official_photo_id")
    .where("official_photo_id.id", "=", id)
    .select("*")
    .first();
}



module.exports = {
  createVerification,
  createAddress,
  createOfficialPhotoid,
  findOfficialPhotoid
};
