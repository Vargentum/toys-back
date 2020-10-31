import {belongsTo, Entity, model, property} from '@loopback/repository';
import {ProductCategory, ProductCategoryWithRelations} from './product-category.model';

@model()
export class Product extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
    required: true,
  })
  weight: number;

  @belongsTo(() => ProductCategory)
  productCategoryId: number;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
  productCategory?: ProductCategoryWithRelations;
}

export type ProductWithRelations = Product & ProductRelations;
