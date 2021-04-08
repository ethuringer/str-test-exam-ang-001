import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$: Observable<Product[]> = this.productService.getAll();

  clickedElementID?: number = 0;
  actionEvent: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onDelete(id: number): void {
    this.clickedElementID = id;
    this.productService.remove(id).subscribe();
    document.location.reload();
  }


}
