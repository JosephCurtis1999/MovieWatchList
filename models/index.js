const Users = require("./Users");
const Watchlist = require("./Watchlist");

Users.hasMany(Watchlist, {
    onDelete: 'cascade'
})

Watchlist.belongsTo(Users, {
    foreignKey: {
        allowNull: false
    }
})

module.exports = { Users, Watchlist };
