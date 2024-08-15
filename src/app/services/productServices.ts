import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductDocuments } from '../models/productDocuments';

@Injectable({
    providedIn: 'root',
})

class ProductService {

    private fetchResultSource = new BehaviorSubject<ProductDocuments[]>([]);
    fetchResults$ = this.fetchResultSource.asObservable();

    updateFetchResultSource(data: ProductDocuments[]) {
        this.fetchResultSource.next(data);
      }

}
export { ProductService };