import { paymentUser } from './payment-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http:HttpClient) { }

    public doRegistration(user:User){
      
      return this.http.post("http://localhost:8070/create",user,{responseType:'text' as 'json'});
    }
    public doPayment(PaymentUser:paymentUser)
    {
      // let headers = new Headers({'Content-Type':'application/json'});
      // let options = new RequestOptions({headers:headers});
      return this.http.get("http://localhost:8080/authorize_payment");

    }
    public gettingCredentials()
    {
      return this.http.get("http://localhost:8070/getAll");
    }
  }
