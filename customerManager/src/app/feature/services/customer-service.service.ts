import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomerDetail } from '../models/customer-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<CustomerDetail[]> {
    return this.http.get<CustomerDetail[]>("../assets/customer-details.json");
  }
  
  getCustomerDetails(id: number): Observable<CustomerDetail> {
    return this.getCustomers().pipe(
      map((customers: CustomerDetail[]) => customers.find(p => p.customerId === id))
  )};
  }
