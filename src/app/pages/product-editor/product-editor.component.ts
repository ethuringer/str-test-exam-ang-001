import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Category } from 'src/app/model/category.enum';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  product$: Observable<Product> = this.activatedRoute.params.pipe(
    switchMap( params => {
      if (Number(params.id) === 0) {
        return of(new Product());
      }

      return this.productService.get(Number(params.id));
    })
  );

  productCategory = Category;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm, product$: Product): void {
    if (product$.id === 0) {
      this.productService.create(product$).subscribe(
        () => {
          this.router.navigate(['']);
        }
      );
    } else {
      this.productService.update(product$).subscribe(
        () => {
          this.router.navigate(['']);
        }
      );
    }
  }
}
