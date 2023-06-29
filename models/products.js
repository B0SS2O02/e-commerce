'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Products.belongsTo(models.Category, {
        foreignKey: 'category'
      })
      Products.hasMany(models.Category, {
        foreignKey: "category"
      })
      models.Category.hasMany(Products, {
        foreignKey: 'category'
      })
      // define association here
    }
  }
  Products.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    characteristics: DataTypes.TEXT,
    description: DataTypes.TEXT,
    category: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};