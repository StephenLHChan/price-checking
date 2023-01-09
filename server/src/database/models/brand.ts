import Sequelize from '../database';
import { DataTypes } from 'sequelize';


const Brand = Sequelize.define('brand', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Brand;
