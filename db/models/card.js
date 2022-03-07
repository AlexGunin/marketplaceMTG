'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City, { foreignKey: 'city_id' });
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.hasOne(models.Order, { foreignKey: 'card_id' });
    }
  }

  Card.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    image: DataTypes.TEXT,
    city_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
    state: DataTypes.STRING,
    available: DataTypes.BOOLEAN,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};
