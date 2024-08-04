/**
 * @class CRUDOperations to be used for GraphQL mutations and queries
 */
import { Product} from '../classes/productManagement';
import { createProduct } from '../../graphql/mutations';
import { generateClient } from '@aws-amplify/api';


class CRUDOperations {

    constructor(){}


//CRUD operations:
async createProductItemInDDB(productId: string, aProduct: Product, productPathInBucket: string): Promise<string> {

    const client = generateClient();
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

        })
        console.log("GraphQl result:",result);
        return result.data.createProduct.createdAt.toString();
    }
    catch (error) {
        throw new Error("Error creating product item in CRUD operations!");
    }

}

//2. read the product items from the database
    //get items for Producers group 
    async readProductItemsFromDDB(): Promise<
    //get items for Consumers group

//3. get vulnerability details of this product item

}


export {CRUDOperations};
