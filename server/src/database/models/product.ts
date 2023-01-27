import Sequelize from '../database';
import { DataTypes } from 'sequelize';

const Product = Sequelize.define('product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  subCategoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'product_sub_categories',
      key: 'id',
    },
  },
  brandId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'brands',
      key: 'id',
    },
  },
});

export default Product;
