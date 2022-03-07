'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'buyer_id' });
      this.belongsTo(models.User, { foreignKey: 'seller_id' });
      this.belongsTo(models.Card, { foreignKey: 'card_id' });
    }
  }
  Order.init({
    buyer_id: DataTypes.INTEGER,
    card_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};