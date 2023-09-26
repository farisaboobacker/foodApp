import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = 'https://localhost:7020/api/Products';
  constructor(protected http:HttpClient) { }

  getProducts():Observable<any>{
    console.table(this.http.get<any>(`${this.baseUrl}`));
    return this.http.get<any>(`${this.baseUrl}`);

  }
  addProducts(Product:any){
    console.log(Product);
    // console.table(this.http.post<any>(`${this.baseUrl}`,Product));
    return this.http.post<any>(`${this.baseUrl}`,Product);
  }
}
