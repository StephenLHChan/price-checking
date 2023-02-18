import Sequelize from '../database';
import { DataTypes } from 'sequelize';

const Price = Sequelize.define('price', {
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'products',
      key: 'id',
    },
  },
  merchantId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'merchants',
      key: 'id',
    },
  },
});

export default Price;
