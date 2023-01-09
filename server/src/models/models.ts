import Brand from './brand';
import Product from './product';


Product.belongsTo(Brand);
Brand.hasMany(Product);

export { Brand, Product };
