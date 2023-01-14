import Brand from './brand';
import Merchant from './merchant';
import Price from './price';
import Product from './product';
import ProductCategory from './productCategory';
import ProductSubCategory from './productSubCategory';


ProductCategory.hasMany(ProductSubCategory);
ProductSubCategory.belongsTo(ProductCategory);
ProductSubCategory.hasMany(Product);
Product.belongsTo(ProductSubCategory);

Product.belongsTo(Brand);
Brand.hasMany(Product);

export { Brand, Merchant, Price, Product, ProductCategory};
