const Users = require("./Users");
const Watchlist = require("./Watchlist");

// setting up relationships between the user and the 
// watchlist databases. Also requiring them and exporting them so the rest of the application can access it
Users.hasMany(Watchlist, {
    onDelete: 'cascade'
})

Watchlist.belongsTo(Users, {
    foreignKey: {
        allowNull: false
    }
})

module.exports = { Users, Watchlist };
