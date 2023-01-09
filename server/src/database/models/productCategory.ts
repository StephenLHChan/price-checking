import Sequelize from '../database';
import { DataTypes } from 'sequelize';

const ProductCategory = Sequelize.define('product_category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

export default ProductCategory;
