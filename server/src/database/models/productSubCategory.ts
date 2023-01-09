import Sequelize from '../database';
import { DataTypes } from 'sequelize';

const ProductSubCategory = Sequelize.define('product_sub_category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product_categories',
        key: 'id'
      }
    }
  });

export default ProductSubCategory;
