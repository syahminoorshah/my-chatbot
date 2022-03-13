import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IdentityServiceService {

  constructor(private http: HttpClient) { }


  buildContext() {
    if (!localStorage.getItem('id')) {
      this.http.get<any>('http://127.0.0.1:8000/api/build-context').subscribe((data) => {
        localStorage.setItem('id', data.id)
      });
    }
  }

  updateIdentity(info: any){
    console.log("HERREEE");

    return this.http.post<any>('http://127.0.0.1:8000/api/update-identity', info);
  }
}
