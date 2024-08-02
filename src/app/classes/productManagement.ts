import { getProperties, uploadData } from '@aws-amplify/storage';
import { generateClient } from '@aws-amplify/api'


export  type aProduct = {
    name: string;
    description: string;
    price: number;
    data: File;
}
export class ProductManagement {
    progress: number = 0;
    isInProgress: boolean = false;

    constructor() {}

    //Upload new product to S3
    async uploadNewProduct(product: aProduct): Promise<string> {

        try {
            const fileUploaded = await uploadData({
                
                path: ({identityId}) => `public/${identityId}/${product.data.name}`,
                data: product.data,
                options: {
                    onProgress: ({ transferredBytes, totalBytes}) =>{
                        if (totalBytes) 
                            this.progress = Math.round((transferredBytes / totalBytes) * 100);
                            this.isInProgress = true;
                    }
                }
            }).result;

            console.log(fileUploaded);
            return fileUploaded.path;
        } catch (error) {
            throw new Error("Uploading new product failed");
        }
        

    }
    //TODO:

    //delete product from S3


    
    
}
