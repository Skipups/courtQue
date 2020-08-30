'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Type.belongsToMany(models.Court,{through:"Court_types"})
      models.Type.hasMany(models.Request)
      // define association here
    }
  };
  Type.init({
    typeName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
};