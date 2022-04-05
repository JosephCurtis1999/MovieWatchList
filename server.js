const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const handlebars = require("express-handlebars");

const router = require("./controllers");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
  });
});

console.log();
