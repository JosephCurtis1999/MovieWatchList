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
            allowNull: false,
        },
        overview: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
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