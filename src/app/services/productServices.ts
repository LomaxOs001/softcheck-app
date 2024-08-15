import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductDocuments } from '../models/productDocuments';

@Injectable({
    providedIn: 'root',
})

class ProductService {

    private fetchedProductDocuments = new BehaviorSubject<ProductDocuments[]>([]);
    private fetchedVulnerabilityData = new BehaviorSubject<boolean>(false);

    fetchedProductsObservable = this.fetchedProductDocuments.asObservable();
    fetchvulnerabilityObservable = this.fetchedVulnerabilityData.asObservable();

    updateFetchedProductData(data: ProductDocuments[]) {
        this.fetchedProductDocuments.next(data);
      }
      
    updateFetchedVulnerabilityData(data: boolean) {
        this.fetchedVulnerabilityData.next(data);
    }

}
export { ProductService };