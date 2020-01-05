import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/feature/services/customer-service.service';
import { CustomerDetail } from 'src/app/feature/models/customer-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  @Input() customerinput;
  @Output() valueChange = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() addNewcustomer = new EventEmitter();
  constructor(private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService) { }
    customerForm : FormGroup;
    customerDetail: CustomerDetail;
    outCustomer: CustomerDetail;
    addFlag = true;
    message;

  ngOnInit() {
    if(this.customerinput) {
       this.getCustomer(this.customerinput.customerId);
       this.addFlag = false;
    }
    this.customerForm = new FormGroup({
      firstName: new FormControl((this.customerinput && this.customerinput.firstName) ? this.customerinput.firstName: '',
      [Validators.required]),
      lastName: new FormControl((this.customerinput && this.customerinput.lastName) ? this.customerinput.lastName:'',
      [Validators.required]),
      gender: new FormControl((this.customerinput && this.customerinput.gender) ? this.customerinput.gender: ''),
      email: new FormControl((this.customerinput && this.customerinput.email) ? this.customerinput.email: ''),
      address: new FormControl((this.customerinput && this.customerinput.address) ? this.customerinput.address: ''),
      city: new FormControl((this.customerinput && this.customerinput.city) ? this.customerinput.city: ''),
      State: new FormControl((this.customerinput && this.customerinput.State) ? this.customerinput.State: '')
    });
  }

  getCustomer(id: number) {
    this.customerService.getCustomerDetails(id).subscribe((response) => {
      this.customerDetail = response;
    });
  }

  event(action: string) {
    if (action === 'update'){
      if(this.customerForm.valid) {
    this.outCustomer = this.customerForm.value;
    this.outCustomer.customerId = this.customerinput.customerId;
    this.outCustomer.amount = this.customerinput.amount;
    this.outCustomer.fullName = this.customerForm.value.firstName + ' ' + this.customerForm.value.lastName;
    this.valueChange.emit(this.outCustomer);
  } else {
    this.message = "First Name and Last Name are required!"
  }
  } else if (action === 'cancel') {
    this.cancel.emit();
  } else if (action === 'delete'){
    this.delete.emit(this.customerinput);
  }
  }

  addNew() {
    if (this.customerForm.valid) {
    this.outCustomer = this.customerForm.value;
    this.outCustomer.fullName = this.customerForm.value.firstName + ' ' + this.customerForm.value.lastName;
    this.addNewcustomer.emit(this.outCustomer);
  } else {
    this.message = "First Name and Last Name are required!"
  }
  }

}
