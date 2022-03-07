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

      this.belongsTo(models.City, { foreignKey: 'city_id' });
      this.hasOne(models.Card, { foreignKey: 'user_id' });
      this.hasOne(models.Order, { foreignKey: 'buyer_id' });
      this.hasOne(models.Order, { foreignKey: 'seller_id' });
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    city_id: DataTypes.INTEGER,
    photo: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
