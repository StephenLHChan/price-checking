import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/price-checking', {
  logging: false,
});

export default sequelize;
