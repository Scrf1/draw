'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schema = sequelize.define('Schema', {
    nom: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    schema_id: DataTypes.INTEGER
  }, {});
  Schema.associate = function(models) {
    // associations can be defined here
  };
  return Schema;
};