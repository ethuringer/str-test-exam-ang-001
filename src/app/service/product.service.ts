import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  endpoint: string = 'https://nettuts.hu/jms/ethuringer/products';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.endpoint}`);
  }


  get(id: number): Observable<Product> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    if (id !== 0) {
      return this.http.get<Product>(`${this.endpoint}/${id}`);
    }
    return of(new Product());
  }
  

  remove(product: any): Observable<any> {
    product = product.id ? product.id : product;
    return this.http.delete<Product>( `${this.endpoint}/${product}` );
  }
  

   create(product: Product): Observable<any> {
    return this.http.post<Observable<any>>(`${this.endpoint}`, product);
  }


   update(product: Product): Observable<any> {
    return this.http.patch<any>(`${this.endpoint}/${product.id}`, product);
  }
}
