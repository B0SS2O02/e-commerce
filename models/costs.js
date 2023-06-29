'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Costs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Counts.belongsTo(models.Products, {
        foreignKey: 'product'
      })
      Counts.hasMany(models.Products, {
        foreignKey: "product"
      })
      models.Products.hasMany(Counts, {
        foreignKey: 'product'
      })
    }
  }
  Costs.init({
    product: DataTypes.INTEGER,
    currency: DataTypes.INTEGER,
    cost: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Costs',
  });
  return Costs;
};