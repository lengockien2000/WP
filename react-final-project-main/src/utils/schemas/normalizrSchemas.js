import { schema } from 'normalizr';

export const product = new schema.Entity('product');
export const arrayOfProduct = [product];
