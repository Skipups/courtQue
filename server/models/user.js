'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    userId: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phoneNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		token:{
			type: DataTypes.STRING(1000),
      allowNull: false,
			defaultValue: ""      
		},    
		verified:{
			type: DataTypes.BOOLEAN,
      allowNull: false,
			defaultValue: false      
		}    
  }, {
    sequelize,
    modelName: 'Users',
  });
  return User;
};