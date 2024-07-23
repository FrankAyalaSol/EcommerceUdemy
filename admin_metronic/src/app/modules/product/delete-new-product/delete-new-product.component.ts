import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-delete-new-product',
  templateUrl: './delete-new-product.component.html',
  styleUrls: ['./delete-new-product.component.scss']
})
export class DeleteNewProductComponent implements OnInit {

  @Input() product:any;
  @Output() ProductD:EventEmitter<any> = new EventEmitter();
  
  constructor(
    public modal: NgbActiveModal,
    public productService: ProductService,
    public toaster: Toaster
  ) { }

  ngOnInit(): void {

  }

  delete(){
    this.productService.deleteProducts(this.product._id).subscribe((resp:any)=>{
      console.log(resp);
      this.ProductD.emit("");
      this.modal.close();
      return;
    }, (error)=>{
      if(error.error){
        this.toaster.open(NoticyAlertComponent,{text:`danger- '${error.error.message}'`});
      }
    })
  }
}
