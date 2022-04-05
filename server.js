const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const handlebars = require("express-handlebars");

const router = require("./controllers");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  session({
    secret: "a secret",
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
  });
});

console.log();
