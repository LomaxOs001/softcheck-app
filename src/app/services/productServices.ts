import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductDocuments } from '../models/productDocuments';
import { VulnerabilityDocuments } from '../models/vulnerabilityDocuments';
import { CRUDOperations } from '../models/CRUDOperations';

@Injectable({
    providedIn: 'root',
})

class ProductService {

    private crud = new CRUDOperations();
    private productDetails = new BehaviorSubject<ProductDocuments[]>([]);
    private vulnerabilityDetails = new BehaviorSubject<VulnerabilityDocuments[]>([]);
    showQualitativeRepresentation = false;
    
    observeFetchedProductDocuments = this.productDetails.asObservable();
    observeFetchedVulnerabilityDocuments = this.vulnerabilityDetails.asObservable();

    
    async fetchProductDocumentServiceById(productId: string) {
        const productDocs = await this.crud.fetchProductItemsById(productId); //fetch producers' data via GraphQL query
        this.updateProductDocumentService(productDocs);
    }

    async fetchProductDocumentsServiceByCollection() {
        const productDocs = await this.crud.fetchProductItems();//fetch consumers' data via GraphQL query
        this.updateProductDocumentService(productDocs);
    }

    private updateProductDocumentService(data: ProductDocuments[]) {//update product document data with new fetched product items
        this.productDetails.next(data);
      }
      
    
    async fetchVulnerabilityDocumentService(stateId: string) {
        const severityList = await this.crud.fetchVulnerabilityDetails(stateId);//fetch vulnerability state via GraphQL query
        this.updateVulnerabilityDocumentService(severityList);
        this.showQualitativeRepresentation = true;
    }

    private updateVulnerabilityDocumentService(data: VulnerabilityDocuments[]) {//update vulnerability document data with new fetched vulnerability items
        this.vulnerabilityDetails.next(data);
    }
    closeQualitativeRepresentationModal() {
        this.showQualitativeRepresentation = false; 
      }


}
export { ProductService };
