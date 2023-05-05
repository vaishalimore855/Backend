const express = require("express");
const helmet = require("helmet");
const cors = require("cors");



const server = express();
const fileUpload = require('express-fileupload');

const usersRoutes = require("./users/usersRoutes");
const usermgtRoutes = require("./admins/users/usersRoutes");
const walletRoutes = require("./wallet/walletRoutes");

server.use(fileUpload({
  createParentPath: true
}));
var path = require('path');
server.use(express.static(path.join(__dirname, 'filesupload')));

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/users", usersRoutes);
server.use("/api/admin/usermgt", usermgtRoutes);
server.use("/api/wallet", walletRoutes);

server.get("/", (req, res) => {
  res.status(200).json({ message: "EVC API is working!" });
});

server.all("*", (req, res) => {
  res.status(404).send({
    error: "The resource you are looking for does not exist",
  });
});
  
const port = process.env.PORT || 8000;

if (process.env.NODE_ENV !== "test") {
  const serverIO = server.listen(
    port,
    console.log(`Listening on Port ${port}`)
  );
  const io = require("./socket").init(serverIO);
  io.on("connection", (socket) => {
    socket.on("joinRoom", (room) => {
      console.log("joined room");
      socket.join(room);
    });

    console.log("client connected");
  });
}
module.exports = server;
