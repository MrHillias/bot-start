const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  chatId: { type: DataTypes.STRING, unique: true },
  firstname: { type: DataTypes.STRING, nullable: true },
  lastname: { type: DataTypes.STRING, nullable: true },
  username: { type: DataTypes.STRING, nullable: true },
  avatar: { type: DataTypes.STRING, nullable: true },
  score: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  gamesLeft: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 5 },
  lastTimeGamesAdded: { type: DataTypes.DATE, allowNull: true },
  currentStreak: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  hoursPassed: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  updatedToday: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = User;
