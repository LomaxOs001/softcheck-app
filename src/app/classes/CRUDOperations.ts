/**
 * @class CRUDOperations to be used for GraphQL mutations and queries
 */
import { Product} from '../classes/productManagement';
import { createProduct } from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { generateClient } from '@aws-amplify/api';

const client = generateClient();

class CRUDOperations {

    constructor(){}


//CRUD operations:

    async createProductItemInDDB(productId: string, aProduct: Product, productPathInBucket: string): Promise<string> {

        try {
            const result = await client.graphql({
                query: createProduct,
                variables: {
                    input: {
                        ProductId: productId,
                        Name: aProduct.name,
                        Description: aProduct.description,
                        Price: aProduct.price,
                        ProductKey: productPathInBucket
                    }
                }

            });
            return "Product " + result.data.createProduct.Name + " is created successfully!";
        }catch (error) {
            //console.error("Error creating product", error);
            throw new Error("Error creating product item in CRUD operations!");
        }
    }



    //list item collection for Producers group
    async readProductItemsFromDDB(productId: string): Promise<any> {
        try {
            const result = await client.graphql({query: queries.listProducts, variables: {ProductId: productId}});
            
            console.log("GraphQl Query result:",result);
            return result.data
        }catch (error) {
            //console.log("Error reading:",error);
            throw new Error("Error reading product items!"); 
        }
    }
    //get items for Consumers group

//3. get vulnerability details of this product item

}


export {CRUDOperations};
