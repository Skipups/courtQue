'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Court extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Court.belongsToMany(models.Type,{through:"Court_types"})
    }
  };
  Court.init({
    court_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Court',
  });
  return Court;
};