'use strict';
module.exports = (sequelize, DataTypes) => {
  const Propriete = sequelize.define('Propriete', {
    nom: DataTypes.STRING,
    type: DataTypes.BOOLEAN,
    schema_id: DataTypes.INTEGER
  }, {});
  Propriete.associate = function(models) {
    // associations can be defined here
  };
  return Propriete;
};