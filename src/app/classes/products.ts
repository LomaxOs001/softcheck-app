import { getProperties, uploadData } from '@aws-amplify/storage';

export  type aProduct = {
    name: string;
    description: string;
    price: number;
    date: Date;
    data: File;
}
export class Products {
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
    //Create data model for DB
    //Create a function to store the product to DB
    
}
