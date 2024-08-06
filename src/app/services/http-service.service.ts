import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { 
  }
    loginPost(body:any){
      return this.http.post("http://localhost/angular_crud/em_be/api/v1/auth/login/",body)
    }
  
}
