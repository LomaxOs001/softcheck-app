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

    updateProductDocumentService(data: ProductDocuments[]) {
        this.productDetails.next(data);
      }
      
    
    async fetchVulnerabilityDocumentService(stateId: string) {
        const severityList = await this.crud.fetchVulnerabilityDetails(stateId);
        this.updateVulnerabilityDocumentService(severityList);
        this.showQualitativeRepresentation = true;
    }

    private updateVulnerabilityDocumentService(data: VulnerabilityDocuments[]) {
        this.vulnerabilityDetails.next(data);
    }
    closeQualitativeRepresentationModal() {
        this.showQualitativeRepresentation = false; 
      }



}
export { ProductService };