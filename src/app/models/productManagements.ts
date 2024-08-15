import { uploadData } from '@aws-amplify/storage';

export  type ProductType = {
    name: string;
    description: string;
    price: number;
    data: File;
}

class ProductManagement {
    progress: number = 0;
    isInProgress: boolean = false;

    constructor() {}

    //Upload new product to S3
    async uploadNewProduct(product: ProductType): Promise<string> {
        try {
            const fileUploaded = await uploadData({
                
                path: ({identityId}) => `protected/${identityId}/${product.data.name}`,
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
   
}

export { ProductManagement}
