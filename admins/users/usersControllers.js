require("dotenv").config();
const bcrypt = require("bcryptjs");
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const crypto = require('crypto');
const User = require("./usersModels");
var nodemailer = require('nodemailer');
const { generateToken } = require("./usersHelper");
var Web3 = require('web3');
const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "_Freezelisted", "type": "address" }], "name": "AddToFreezelist", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "tokenOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "_whitelisted", "type": "address" }], "name": "RemoveFromFreezelist", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "Freezelistaddress", "type": "address" }], "name": "addtoFreezelist", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "who", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "remaining", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenOwner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "balance", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "chnageOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "whitelistaddress", "type": "address" }], "name": "removefromFreezelist", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "showstateofuser", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "tybalanceOfpe": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];

var TEST_NET = 'https://data-seed-prebsc-1-s1.binance.org:8545';
var TEST_NET_ADDRESS = '0x41f6d4577A5857507F8e7cA756129124F0CCb2E6';
var web3 = new Web3(new Web3.providers.HttpProvider(TEST_NET));
let WowContract = new web3.eth.Contract(abi, TEST_NET_ADDRESS);
let Adminpublickey = "0x488aE3b61041Ca5faeB547AEd74bCff0b4Dc81d5";
let privatekey = "d66c0702691ee1eb99d5b6a861b938bffe02430bc3219bee509f1bbedb506180";


exports.GetAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.finduserById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
  
exports.GetAllUser = async (req, res) => {
  try {
    const admin='user';
    const getmylist={
      delete_status: '0',
      user_type:admin
    }
    console.log(getmylist);
    const UserList = await User.findUsers(getmylist); 

     //const UserList = await User.findUsers(); 
   return res.status(200).json(UserList);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }nonpayable
};

exports.GetAllDeleteUser = async (req, res) => {
  try {
    const UserList = await User.findDeleteUsers();
   return res.status(200).json(UserList);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

exports.AddUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const useraddress = web3.eth.accounts.create(username);
    const wowaddress = useraddress['address'];
    const privateKey = useraddress['privateKey'];
    const credentials = {
      username,
      email,
      wowaddress,
      privateKey,
      password: hashedPassword,
    };
    const emailExist = await User.findBy({
      email: credentials.email,
    });
    const usernameExist = await User.findBy({
      username: credentials.username,
    });
    if (emailExist || usernameExist) {
      if (emailExist)
        res.status(409).json({
          errorMessage: "Oops, email already exists",
        });
      else
        res.status(409).json({
          errorMessage: "Oops, username already exists",
        });
    } else {
      const [newUser] = await User.createUser(credentials);
      const user_id = newUser;
      const totalbalance = await WowContract.methods.balanceOf(wowaddress).call();
      const balanceData = {
        user_id,
        totalbalance,
      };
      const [CreateBalance] = await User.createBalance(balanceData);

      res.status(201).json({
        message: "User created",
        token: generateToken(newUser.email, newUser.id),
        user: newUser,
        address: wowaddress
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errorMessage: "Oops, something went wrong while registering",
      error,
    });
  }
};

exports.UpdateUser = async (req, res) => {
  const user = req.body;
  try {
    const updatedUser = await User.updateUserById(user);
    if (!updatedUser) {
      return res.status(400).json({
        errorMessage: "Something went wrong with your trade request",
      });
    }
    const newUser = await User.finduserById(user.id);
    res.status(201).json({
      message: "User Updated",
      user: newUser,
    });
    //return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("erroraaa", error)
    return res.status(500).json({
      errorMessage: error,
    });
  }
}

exports.Userdelete = async (req, res) => {
  const statusData = req.body;
  try {
    const updatedUser = await User.accountDeletion(statusData);
    if (!updatedUser) {
      return res.status(400).json({
        errorMessage: "Something went wrong with your trade request",
      });
    }
    const newUser = await User.finduserById(statusData.id);
    res.status(201).json({
      message: "Account Deletion",
      user: newUser,
    });
    //return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error,
    });
  }
};

exports.UpdateUser = async (req, res) => {
  const user = req.body;
  try {
    const updatedUser = await User.updateUserById(user);
    if (!updatedUser) {
      return res.status(400).json({
        errorMessage: "Something went wrong with your trade request",
      });
    }
    const newUser = await User.finduserById(user.id);
    res.status(201).json({
      message: "User Updated",
      user: newUser,
    });
    //return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("erroraaa", error)
    return res.status(500).json({
      errorMessage: error,
    });
  }
}

exports.ActiveUser = async (req, res) => {
  const id = req.body.id;
  const active_status = true;
  try {
    const statusData = {
      id,
      active_status
    };
   const updatedUser = await User.ActiveDeactiveuser(statusData);
    if (!updatedUser) {
      return res.status(400).json({
        errorMessage: "Something went wrong with your trade request",
      });
    }
    const newUser = await User.finduserById(statusData.id);
    res.status(201).json({
      message: "Account Actived Successfully",
      user: newUser,
    });
    //return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorMessage: error,
    });
  }
};

exports.DeactiveUser = async (req, res) => {
  const id = req.body.id;
  const active_status = false;
  try {
    const statusData = {
      id,
      active_status
    };
    const updatedUser = await User.ActiveDeactiveuser(statusData);
    if (!updatedUser) {
      return res.status(400).json({
        errorMessage: "Something went wrong with your trade request",
      });
    }
    const newUser = await User.finduserById(statusData.id);
    res.status(201).json({
      message: "Account Deactived Successfully",
      user: newUser,
    });
    //return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorMessage: error,
    });
  }
};

exports.getBalance = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await User.getBalance(user_id);
    const userprofile = await User.finduserById(user_id);

    const weiBalance = await WowContract.methods.balanceOf(userprofile.wowaddress).call();
    let totalbalance = web3.utils.fromWei(weiBalance, 'ether');

    const balanceData = {
      user_id,
      totalbalance,
    };

    if (!user) {

      const CreateBalance = await User.createBalance(balanceData);

    } else {

      if (user.totalbalance !== totalbalance) {

        const CreateBalance = await User.updateBalanceById(balanceData);

      }
    }

    const userdata = await User.getBalance(user_id);
    const balance = userdata.totalbalance - userdata.escrowbalance;

    return res.status(200).json({
      userId: user_id,
      balance: balance,
      wowaddress: userprofile.wowaddress,
    });

  } catch (error) {
    return res.status(500).json({ error });
  }
};
