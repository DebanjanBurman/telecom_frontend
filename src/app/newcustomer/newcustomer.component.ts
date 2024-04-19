import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newcustomer',
  templateUrl: './newcustomer.component.html',
  styleUrls: ['./newcustomer.component.scss']
})
export class NewcustomerComponent implements OnInit {
  url = "http://172.25.16.1:9020"
  cust_name = "";
  birthday = "";
  cust_email = "";
  aadhar = "";
  regn_date = "";
  phone = "";
  plan_name = "Platinum365";
  plan_cost = "499";
  plan_validity = "365";
  plan_status = "null";
  public plans = [
    {name:"Platinum365", cost: "499", validity:"365"},
    {name:"Gold180", cost: "299",validity:"180"},
    {name:"Silver90", cost: "199",validity:"90"},
  ];
  customerTableData:any;
  constructor(private http:HttpClient, private router: Router){
    
  }

  ngOnInit(): void {
    this.getCustomerData()
  }

  submit(){
    console.log("Entered values: ",this.cust_name,this.birthday,this.cust_email,this.aadhar,this.regn_date,this.phone,this.plan_name,this.plan_cost,this.plan_validity,this.plan_status)
    var errorFlag = 0;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var error_msg = ""
    // Perform Validations
    if(this.cust_name==""){
      error_msg+="Name cannot be blank."+"\n"
      errorFlag = 1
    }
    if(this.birthday==""){
      error_msg+="Birthday not selected."+"\n"
      errorFlag = 1
    }
    if((!this.cust_email.match(mailformat))||(this.cust_email=="")){
      error_msg+="Invalid or blank email address!"+"\n"
      errorFlag = 1
    }
    if(this.aadhar.length!=12){
      error_msg+="AADHAR No. should be of 12 digits."+"\n"
      errorFlag = 1
    }
    if(this.regn_date==""){
      error_msg+="Registration Date not selected."+"\n"
      errorFlag = 1
    }
    if(this.phone.length!=10 || this.phone[0]=="0"){
      error_msg+="Phone No. should be of 10 digits."+"\n"
      errorFlag = 1
    }
    if(this.plan_status=="null"){
      error_msg+="Plan Status not selected."+"\n"
      errorFlag = 1
    }
    // If bad data found
    if(errorFlag == 1){
      alert(error_msg)
    }
    // If good data found
    else{
      var data = {
        cust_name:this.cust_name,
        birthday:this.birthday,
        cust_email:this.cust_email,
        aadhar:this.aadhar,
        regn_date:this.regn_date,
        phone:this.phone,
        plan_name:this.plan_name,
        plan_cost:this.plan_cost,
        plan_validity:this.plan_validity,
        plan_status:this.plan_status,
        renewal_date:""
      }
      // Make insert api call
      this.http.post(this.url+"/insertCustomer",data).subscribe(res=>{
        if(res=="Failure"){
          alert("New Customer insertion failed.")
        }
        else if(res=="Success"){          
          this.getCustomerData();
          alert("Insertion successfull...")
        }
        else{
          alert("New Customer insertion failed with the error: "+res);
        }
      })
    }
  }

  getCustomerData(){
    // Make get call to display all data
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
    // Change Plan Cost and Validity simulatneously with Plan Name
    for (var i=0;i<3;i++){
      if(this.plans[i]["name"]==this.plan_name){
        this.plan_cost = this.plans[i]["cost"];
        this.plan_validity = this.plans[i]["validity"];
      }
    }
  }
}
