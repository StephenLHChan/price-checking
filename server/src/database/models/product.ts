import Sequelize from '../database';
import { DataTypes } from 'sequelize';

const Product = Sequelize.define('product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subCategoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'product_sub_categories',
      key: 'id'
    }
  }
});

export default Product;
