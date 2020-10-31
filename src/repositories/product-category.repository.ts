import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ProductCategory, ProductCategoryRelations, Product} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProductRepository} from './product.repository';

export class ProductCategoryRepository extends DefaultCrudRepository<
  ProductCategory,
  typeof ProductCategory.prototype.id,
  ProductCategoryRelations
> {

  public readonly products: HasManyRepositoryFactory<Product, typeof ProductCategory.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(ProductCategory, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }

  public findByName(name: string) {
    return this.findOne({where: {name}});
  }
}
