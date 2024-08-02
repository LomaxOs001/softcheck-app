// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Product, Vulnerability } = initSchema(schema);

export {
  Product,
  Vulnerability
};