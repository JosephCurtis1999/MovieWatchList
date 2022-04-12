const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../config/connection");

class Users extends Model {}
//   async checkPassword(comparisonPassword) {
//     return bcrypt.compare(comparisonPassword, this.password);
//   }
// }

Users.init(
  {
    username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [6]
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			// validate: {
			// 	isEmail: true
			// }
		},
		status: {
			type: DataTypes.ENUM('active', 'inactive'),
			defaultValue: 'active'
		}
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: "user",
  //   hooks: {
  //     beforeCreate: async (newUser) => {
  //       newUser.password = await bcrypt.hash(newUser.password, 10);

  //       return newUser;
  //     },

  //     beforeUpdate: async (newUser) => {
  //       newUser.password = await bcrypt.hash(newUser.password, 10);

  //       return newUser;
  //     },
  //   },
  }
);

module.exports = Users;
