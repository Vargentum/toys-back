import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Product,
  ProductCategory,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductProductCategoryController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/product-category', {
    responses: {
      '200': {
        description: 'ProductCategory belonging to Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductCategory)},
          },
        },
      },
    },
  })
  async getProductCategory(
    @param.path.number('id') id: typeof Product.prototype.id,
  ): Promise<ProductCategory> {
    return this.productRepository.productCategory(id);
  }
}
