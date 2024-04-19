import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-existingcustomer',
  templateUrl: './existingcustomer.component.html',
  styleUrls: ['./existingcustomer.component.scss']
})
export class ExistingcustomerComponent implements OnInit {
  logged_cust_aadhar = "908756780632"
  logged_cust_details: any;
  renewal_date = ""
  renewal_plan_status = ""
  new_plan_status = "null"
  new_plan_name = ""
  new_plan_cost = ""
  new_plan_validity = ""
  logged_cust_name: any;
  logged_cust_birthday: any;
  logged_cust_email: any;        
  logged_cust_regn_date: any;
  logged_cust_phone: any;
  logged_cust_plan_name: any;
  logged_cust_plan_cost: any;
  logged_cust_plan_validity: any;
  logged_cust_plan_status: any;
  logged_cust_renewal_date: any;
  url = "http://172.25.16.1:9020"
  public plans = [
    {name:"Platinum365", cost: "499", validity:"365"},
    {name:"Gold180", cost: "299",validity:"180"},
    {name:"Silver90", cost: "199",validity:"90"},
  ];
  customerTableData:any;
  constructor(private http:HttpClient, private router: Router){
    
  }

  ngOnInit(): void {
    this.getCustomerData();
    this.getLoggedCustomerDetails();
    
  }

  getLoggedCustomerDetails(){
    var data = {aadhar:this.logged_cust_aadhar}
    // get logged in user's details
    this.http.post(this.url+"/getLoggedInUserDetails",data).subscribe(res=>{
      if(res=="No records found for this user."){
        alert("No records found for this user.")
      }
      else{
        this.logged_cust_details = res;
        this.logged_cust_name=this.logged_cust_details["Name"],
        this.logged_cust_birthday=this.logged_cust_details["DOB"],
        this.logged_cust_email=this.logged_cust_details["Email"],        
        this.logged_cust_regn_date=this.logged_cust_details["Registration_Date"],
        this.logged_cust_phone=this.logged_cust_details["Mobile"],
        this.logged_cust_plan_name=this.logged_cust_details["Plan_Name"],
        this.logged_cust_plan_cost=this.logged_cust_details["Plan_Cost"],
        this.logged_cust_plan_validity=this.logged_cust_details["Plan_Validity"],
        this.logged_cust_plan_status=this.logged_cust_details["Plan_Status"],
        this.logged_cust_renewal_date=this.logged_cust_details["Renewal_Date"]
      }
    })
  }

  getCustomerData(){
    // To display grid, make get call
    this.http.get(this.url+"/displayCustomer").subscribe(res=>{
      if(res=='Failure'){
        alert("Data load failed")
      }
      else{
        this.customerTableData = res;
      }
    })
  }

  planChange(){
    console.log("Plan Changed")
    // Change Plan cost and validaity along with Plan Name
    for (var i=0;i<3;i++){
      if(this.plans[i]["name"]==this.new_plan_name){
        this.new_plan_cost = this.plans[i]["cost"];
        this.new_plan_validity = this.plans[i]["validity"];
      }
    }
  }

  submit_renew(){
    var error_flag = 0
    // Perform Validation
    if(this.renewal_date==""){
      alert("Renewal Date cannot be blank")
      error_flag = 1
    }
    if(this.renewal_plan_status=="null"){
      alert("Plan Status cannot be blank")
      error_flag = 1
    }
    if(error_flag==0){
      var data = {
        cust_name:this.logged_cust_name,
        birthday:this.logged_cust_birthday,
        cust_email:this.logged_cust_email,
        aadhar:this.logged_cust_aadhar,
        regn_date:this.logged_cust_regn_date,
        phone:this.logged_cust_phone,
        plan_name:this.logged_cust_plan_name,
        plan_cost:this.logged_cust_plan_cost,
        plan_validity:this.logged_cust_plan_validity,
        plan_status:this.renewal_plan_status,
        renewal_date:this.renewal_date
      }
      // Make update api call
      this.http.post(this.url+"/updateCustomer",data).subscribe(res=>{
        if(res=="Failure"){
          alert("Customer Renewal update failed.")
        }
        else if(res=="Success"){          
          this.getCustomerData();
          this.getLoggedCustomerDetails();
          alert("Renewal successfull...")
        }
        else{
          alert("Customer Renewal update failed with the error: "+res);
        }
      })
    }
  }

  submit_upgradation(){
    var error_flag = 0
    // Perform Validation
    if(this.new_plan_name=="null"){
      alert("New Plan Name cannot be blank")
      error_flag = 1
    }
    if(this.new_plan_cost==""){
      alert("Plan Cost cannot be blank")
      error_flag = 1
    }
    if(this.new_plan_validity==""){
      alert("Plan Validity cannot be blank")
      error_flag = 1
    }
    if(this.new_plan_status==""){
      alert("Plan Status cannot be blank")
      error_flag = 1
    }
    if(error_flag==0){
      var data = {
        cust_name:this.logged_cust_name,
        birthday:this.logged_cust_birthday,
        cust_email:this.logged_cust_email,
        aadhar:this.logged_cust_aadhar,
        regn_date:this.logged_cust_regn_date,
        phone:this.logged_cust_phone,
        plan_name:this.new_plan_name,
        plan_cost:this.new_plan_cost,
        plan_validity:this.new_plan_validity,
        plan_status:this.new_plan_status,
        renewal_date:this.logged_cust_renewal_date
      }
      // Make update api call
      this.http.post(this.url+"/updateCustomer",data).subscribe(res=>{
        if(res=="Failure"){
          alert("Customer Plan Change failed.")
        }
        else if(res=="Success"){          
          this.getCustomerData();
          this.getLoggedCustomerDetails();
          this.new_plan_name="";
          this.new_plan_cost="";
          this.new_plan_status="null";
          this.new_plan_validity="";
          alert("Plan Updated successfull...")
        }
        else{
          alert("Customer Plan Change failed with the error: "+res);
        }
      })
    }
  }

}
