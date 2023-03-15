import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor( private http:HttpClient) { }

  apiUrl = 'http://localhost:3000/api/';


  //signup

  signup(data:any):Observable<any>
  {
    console.log(data,'data##');
    return this.http.post(`${this.apiUrl}/signup`,data);
  }

  //login
  login(data:any):Observable<any>
  {
    console.log(data,'data##');
    return this.http.post(`${this.apiUrl}/login`,data);
  }

}
