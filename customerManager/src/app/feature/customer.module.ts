import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './components/customer/customer.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { MatCardModule } from '@angular/material/card'
import { MatPaginatorModule } from '@angular/material/paginator';
import { JwPaginationComponent } from 'jw-angular-pagination';

export const routes: Routes = [
  {
  path: '',
  component: CustomerComponent
  }
  ]


@NgModule({
  declarations: [CustomerComponent, CustomerDetailComponent, JwPaginationComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatCardModule,
    GridModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerModule { }
