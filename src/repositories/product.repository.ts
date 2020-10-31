import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Product, ProductRelations, ProductCategory} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProductCategoryRepository} from './product-category.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly productCategory: BelongsToAccessor<ProductCategory, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProductCategoryRepository') protected productCategoryRepositoryGetter: Getter<ProductCategoryRepository>,
  ) {
    super(Product, dataSource);
    this.productCategory = this.createBelongsToAccessorFor('productCategory', productCategoryRepositoryGetter,);
    this.registerInclusionResolver('productCategory', this.productCategory.inclusionResolver);
  }
}
