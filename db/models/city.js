'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.User, {foreignKey: 'city_id'});
      this.hasOne(models.Card, {foreignKey: 'city_id'});
    }
  }

  City.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};
