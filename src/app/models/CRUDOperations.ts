/**
 * @class CRUDOperations to be used for GraphQL mutations and queries
 */
import { ProductType} from './productManagements';
import { createProduct } from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { generateClient } from '@aws-amplify/api';
import { ProductDocuments } from './productDocuments';
import { VulnerabilityDocuments } from './vulnerabilityDocuments';
import { Vulnerability } from '../../models';

const client = generateClient();

class CRUDOperations {

    constructor(){}


//CRUD operations:

  //Create new product items for Producer users
    async createProductItemInDDB(productId: string, aProduct: ProductType, productPathInBucket: string): Promise<string> {

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
            throw new Error("Error creating product items!");
        }
    }


    //list item collection for Producer users
    async fetchProductItemsById(productId: string): Promise<ProductDocuments[]> {
        try {
            const result = await client.graphql({query: queries.customListProducts, variables: {ProductId: productId}});

            return result.data.listProducts.items.map(product => ({
                name: product.Name,
                description: product.Description,
                date: product.createdAt,
                vulnerabilityState: product.StateId,
                price: product.Price
            })) as ProductDocuments[];

        }catch (error) {
            throw new Error("Error reading product items by Id!"); 
        }
    }


  //list item collection for Consumer users
    async fetchProductItems(): Promise<ProductDocuments[]> {
        try {
            const result = await client.graphql({query: queries.customListProducts});
          
            return result.data.listProducts.items.map(product => ({
                name: product.Name,
                description: product.Description,
                date: product.createdAt,
                vulnerabilityState: product.StateId,
                price: product.Price
            })) as ProductDocuments[];
        }
        catch (error) {
            throw new Error("Error reading product items!");
        }
    }

//3. get vulnerability details of this product item
    async fetchVulnerabilityDetails(id: string): Promise<VulnerabilityDocuments[]>{

        let severityList: VulnerabilityDocuments[] = [];
        try {
            const result = await client.graphql({query: queries.customeGetVulnerability, variables: {VulnerabilityId: id}});

            if (result.data.getVulnerability) {
                severityList.push({
                    Installed: result.data.getVulnerability.Installed,
                    Critical: result.data.getVulnerability.Critical,
                    High: result.data.getVulnerability.High,
                    Medium: result.data.getVulnerability.Medium,
                    Low: result.data.getVulnerability.Low,
                    Unknown: result.data.getVulnerability.Unknown,
                });
            }
            else
                console.error("Unable to find vulnerability information")
            return severityList
        }
        catch (error) {
            //console.error("Unable to find vulnerability information", error);
            throw new Error("Error reading product items!");
        }
    }

}

export {CRUDOperations};
