const Student = require("./Student");
const Watchlist = require("./Watchlist");
const Movie = require("./Movie");


Watchlist.belongsTo(Student, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Student.hasOne(Watchlist, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Watchlist.hasMany(Movie, {
    foreignKey: 'movie',
    onDelete: "cascade"
});

Movie.belongsTo(Watchlist, {
    foreignKey: 'movie',
    onDelete: "cascade"
});

Movie.belongsTo(Student, {
    foreignKey: 'movie',
    onDelete: "cascade"
});

module.exports = { Student, Watchlist, Movie };
