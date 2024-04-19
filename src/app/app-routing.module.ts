import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewcustomerComponent} from './newcustomer/newcustomer.component'
import { ExistingcustomerComponent } from './existingcustomer/existingcustomer.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'new',component:NewcustomerComponent},
  {path:'old',component:ExistingcustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
