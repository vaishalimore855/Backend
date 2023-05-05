// Update with your config settings.
require("dotenv").config(); // load .env variables

module.exports = {
  development: {
    client: "sqlite3", 
    connection :{
      filename: './mydb.sqlite'
    },
    useNullAsDefault: true, // used to avoid warning on console
    migrations: {
      directory: "./data/migrations",
      tableName: "dbmigrations",
    },
    seeds: { directory: "./data/seeds" },
  },
};
