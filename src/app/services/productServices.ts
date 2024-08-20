import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductDocuments } from '../models/productDocuments';
import { VulnerabilityDocuments } from '../models/vulnerabilityDocuments';

@Injectable({
    providedIn: 'root',
})

class ProductService {

    private productDetails = new BehaviorSubject<ProductDocuments[]>([]);
    private vulnerabilityDetails = new BehaviorSubject<VulnerabilityDocuments[]>([]);

    observeFetchedProductDocuments = this.productDetails.asObservable();
    observeFetchedVulnerableDocuments = this.vulnerabilityDetails.asObservable();

    updateFetchedProductDocuments(data: ProductDocuments[]) {
        this.productDetails.next(data);
      }
      
    updateFetchedVulnerabilityDocuments(data: VulnerabilityDocuments[]) {
        this.vulnerabilityDetails.next(data);
    }

}
export { ProductService };