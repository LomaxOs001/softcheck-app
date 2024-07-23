import { getProperties, uploadData } from '@aws-amplify/storage';

export class Products {
    
    constructor(public orgImageUrl:string, public name: string, public description: string, public checkDate: Date = new Date(), public price: number, public data: File) {}

    //Upload new product to S3
    async uploadNewProduct(product: Products): Promise<string> {
        const uploadResult = '';
        try {
            const fileUploaded = await uploadData({
                path: ({identityId}) => `protected/${identityId}`,
                data: this.data,
                options: {
                    onProgress: ({ transferredBytes, totalBytes}) =>{
                        if (totalBytes) 
                            console.log(transferredBytes);
                    }
                }
            }).result;

            return uploadResult;
        } catch (error) {
            return error as string;
        }

    }
    
}
