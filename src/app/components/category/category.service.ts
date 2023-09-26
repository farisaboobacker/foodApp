import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = 'https://localhost:7020/api/Categories';
  constructor(protected http:HttpClient) { }

  getCategory():Observable<any>{
    console.table(this.http.get<any>(`${this.baseUrl}`));
    return this.http.get<any>(`${this.baseUrl}`);
  }
}
