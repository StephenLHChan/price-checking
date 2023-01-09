import Sequelize from '../database';
import { DataTypes } from 'sequelize';

const Merchant = Sequelize.define('merchant', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Merchant;
