const express = require('express');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const path = require('path');
const handlebars = require("express-handlebars");


const userRoutes = require('./controllers/userController.js');
const apiRoutes = require('./controllers/apiController.js')
const sequelize = require("./config/connection");
const models = require('./models');

const port = process.env.PORT || 3000;
const hbs = handlebars.create();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('_method'));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(session({
	secret: "a secret",
	    resave: false,
	    saveUninitialized: true,
	    store: new SequelizeStore({
	      db: sequelize,
}),
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname + '/public')));
app.use('/api', express.static(path.join(__dirname + '/public')));

app.use('/', userRoutes);
app.use('/api', apiRoutes);

require('./config/passport/passport.js')(passport, models.Users);

sequelize.sync().then(function() {
	app.listen(port, function() {
		console.log('Server listening on PORT ' + port);
	});
});