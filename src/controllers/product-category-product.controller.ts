import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  ProductCategory,
  Product,
} from '../models';
import {ProductCategoryRepository} from '../repositories';

export class ProductCategoryProductController {
  constructor(
    @repository(ProductCategoryRepository) protected productCategoryRepository: ProductCategoryRepository,
  ) { }

  @get('/product-categories/{id}/products', {
    responses: {
      '200': {
        description: 'Array of ProductCategory has many Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Product>,
  ): Promise<Product[]> {
    return this.productCategoryRepository.products(id).find(filter);
  }

  @post('/product-categories/{id}/products', {
    responses: {
      '200': {
        description: 'ProductCategory model instance',
        content: {'application/json': {schema: getModelSchemaRef(Product)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ProductCategory.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProductInProductCategory',
            exclude: ['id'],
            optional: ['productCategoryId']
          }),
        },
      },
    }) product: Omit<Product, 'id'>,
  ): Promise<Product> {
    return this.productCategoryRepository.products(id).create(product);
  }

  @patch('/product-categories/{id}/products', {
    responses: {
      '200': {
        description: 'ProductCategory.Product PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Partial<Product>,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.productCategoryRepository.products(id).patch(product, where);
  }

  @del('/product-categories/{id}/products', {
    responses: {
      '200': {
        description: 'ProductCategory.Product DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.productCategoryRepository.products(id).delete(where);
  }
}
