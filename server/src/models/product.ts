import Sequelize from '../database';
import { DataTypes } from 'sequelize';

const Product = Sequelize.define('product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Product;
