'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cart.belongsTo(models.Products, {
        foreignKey: 'product'
      })
      cart.hasMany(models.Products, {
        foreignKey: "product"
      })
      models.Products.hasMany(cart, {
        foreignKey: 'product'
      })
      cart.belongsTo(models.cartUser, {
        foreignKey: 'user'
      })
      cart.hasMany(models.cartUser, {
        foreignKey: "user"
      })
      models.cartUser.hasMany(cart, {
        foreignKey: 'user'
      })
    }
  }
  cart.init({
    user: DataTypes.INTEGER,
    product: DataTypes.INTEGER,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};