const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../config/connection");

class Student extends Model {
  async checkPassword(comparisonPassword) {
    return bcrypt.compare(comparisonPassword, this.password);
  }
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: "student",
    hooks: {
      beforeCreate: async (newStudent) => {
        newStudent.password = await bcrypt.hash(newStudent.password, 10);

        return newStudent;
      },

      beforeUpdate: async (newStudent) => {
        newStudent.password = await bcrypt.hash(newStudent.password, 10);

        return newStudent;
      },
    },
  }
);

module.exports = Student;
