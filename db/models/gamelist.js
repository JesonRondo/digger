/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gamelist', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    time: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ver: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    com: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    }
  }, {
    tableName: 'gamelist'
  });
};
