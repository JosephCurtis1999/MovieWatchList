const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Watchlist extends Model {}

Watchlist.init(
    {
       title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		release_date: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		movieId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		poster: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		overview: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		vote_average: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		popularity: {
			type: DataTypes.INTEGER,
			allowNull: true,
		}
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "watchlist"
    }
)

module.exports = Watchlist;