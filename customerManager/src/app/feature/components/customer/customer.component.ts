import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer-service.service';
import { CustomerDetail } from '../../models/customer-model';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor(private router: Router, private customerService: CustomerService) {
   }
  customerDetail: CustomerDetail[];
  filteredCustomers: CustomerDetail[] = [];
  pageTitle: "Customer Manager";
  show = "card";
  _listFilter = '';
  customerinput;
  updateFlag = false;
  pageOfItems: CustomerDetail[] = [];

  onChangePage(pageOfItems: CustomerDetail[]) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCustomers = this.listFilter ? this.performFilter(this.listFilter) : this.customerDetail;
  }

  performFilter(filterBy: string): CustomerDetail[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.customerDetail.filter((customer: CustomerDetail) =>
    customer.fullName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  addNew() {
    this.updateFlag = true;
    this.customerinput = null;
  }

  public cellClickHandler({ dataItem }): void {
    this.updateFlag = true;
    if(dataItem){
    this.customerinput = dataItem;
    }
  }

  editCustomer(customer: CustomerDetail) {
    this.updateFlag = true;
    if(customer){
      this.customerinput = customer;
      }
  }

  ngOnInit() {
     this.customerService.getCustomers().subscribe((response) => {
     this.customerDetail = response;
     this.filteredCustomers = this.customerDetail;
   });
}

toggleview(action: string) {
 if(action === 'card') {
   this.show = 'card';
 } else if (action === 'list') {
  this.show = 'list';
 }
}

valueChange(event: CustomerDetail) {
  this.updateFlag = false;
  const index = this.customerDetail.findIndex(item => item.customerId === event.customerId)
  // Replace the item by index.
  this.customerDetail.splice(index, 1, event)
  this.filteredCustomers = [...this.customerDetail];
}

cancel() {
  this.updateFlag = false;
}

delete(event) {
  this.updateFlag = false;
  const index = this.customerDetail.findIndex(item => item.customerId === event.customerId)
  // Delete  the item by index.
  this.customerDetail.splice(index, 1);
  this.filteredCustomers = [...this.customerDetail];
}

addNewcustomer(event: CustomerDetail) {
  this.updateFlag = false;
  // adding dummy customerId
  event.customerId = this.customerDetail.length + 1;
  this.customerDetail.push(event);
  this.filteredCustomers = [...this.customerDetail];
}
}
