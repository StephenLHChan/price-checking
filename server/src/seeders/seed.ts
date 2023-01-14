import { faker } from '@faker-js/faker';

import sequelize  from '../database/database';
import Brand from '../database/models/brand';
import Merchant from '../database/models/merchant';
import ProductCategory from '../database/models/productCategory';

const brands: Array<{ [key: string]: string }> = [{name: 'Brand 1'}];
for(let i = 0; i < 3; i++){
  brands.push({ name: faker.company.name()})
}

const merchants: Array<{ [key: string]: string }> = [{name: 'Merchant 1'}];
for(let i = 0; i < 3; i++){
  merchants.push({ name: faker.company.name()})
}

const product_categories: Array<{ [key: string]: string }> = [{name: 'Product Categories 1'}];
for(let i = 0; i < 3; i++){
  product_categories.push({ name: faker.commerce.department()})
}

(async () => {
  try {
    await sequelize.sync({ force: true });
    await Brand.bulkCreate(brands);
    await Merchant.bulkCreate(merchants);
    await ProductCategory.bulkCreate(product_categories);
    console.log('Seeding is successful');
  } catch (error) {
    console.error('Error while seeding:', error);
  } finally {
    sequelize.close();
  }
})();
