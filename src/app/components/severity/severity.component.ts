import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VulnerabilityDocuments } from '../../models/vulnerabilityDocuments';
import { ProductService } from '../../services/productServices';

@Component({
  selector: 'app-severity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './severity.component.html',
  styleUrl: './severity.component.css'
})
class SeverityComponent implements OnChanges {

  productVulnerabilityState: VulnerabilityDocuments[] = [];
  @Input() severityVisible = false;
  @Output() close = new EventEmitter<void>();
  


  constructor(public productService: ProductService,){}

  ngOnChanges(): void {
      if (this.severityVisible) {
        this.productService.observeFetchedVulnerabilityDocuments.subscribe(data => {
          this.productVulnerabilityState = data
        });
      }
    }
  closeQualitativeRepresentationModal() {
    this.close.emit();
  }
  
}

export {SeverityComponent};
