'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Counts extends Model {
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
  Counts.init({
    product: DataTypes.INTEGER,
    storage: DataTypes.INTEGER,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Counts',
  });
  return Counts;
};