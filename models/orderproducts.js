'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderProducts.belongsTo(models.Orders, {
        foreignKey: 'order'
      })
      OrderProducts.hasMany(models.Orders, {
        foreignKey: "order"
      })
      models.Orders.hasMany(OrderProducts, {
        foreignKey: 'order'
      })
      
      OrderProducts.belongsTo(models.Products, {
        foreignKey: 'product'
      })
      OrderProducts.hasMany(models.Products, {
        foreignKey: "product"
      })
      models.Products.hasMany(OrderProducts, {
        foreignKey: 'product'
      })
    }
  }
  OrderProducts.init({
    order: DataTypes.INTEGER,
    product: DataTypes.INTEGER,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderProducts',
  });
  return OrderProducts;
};