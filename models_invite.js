const sequelize = require("./db_invites");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  chatId: { type: DataTypes.STRING, unique: true },
  code: { type: DataTypes.STRING, unique: true },
  inviteLink: { type: DataTypes.STRING, unique: true },
  friendsId: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
});

module.exports = User;
