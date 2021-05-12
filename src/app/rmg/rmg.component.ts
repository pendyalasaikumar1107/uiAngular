import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-rmg',
  templateUrl: './rmg.component.html',
  styleUrls: ['./rmg.component.css']
})
export class RMGComponent implements OnInit {

  id;
  name:String = '';
  profileorigin ='';
  mobileno="";
  location="";
  experience="";
  skill1="";
  skill2="";
  skill3="";
  
  private toasterService:ToasterService;
  constructor(public http:HttpClient, toasterService:ToasterService) {
    this.toasterService = toasterService;
   }

  checked:boolean= false;
  ngOnInit(): void {
    
  }
  
  GetStats(obj: any, isChecked: boolean){
    this.checked = isChecked;
    if(this.checked){
      this.profileorigin = "TCS"
    }
    else{
      this.profileorigin = ""
    }
  }

  mydate = new Date();
  
  cValue = formatDate(this.mydate, 'yyyy-MM-dd', 'en-US');
  // JSON.stringify(obj);
  obj={}
  sendpost(){
    this.obj = {
    "id": this.id,
    "vendor": this.profileorigin,
    "name": this.name,
    "mobileno": this.mobileno,
    "location": this.location,
    "experience": parseFloat(this.experience),
    "skill1": this.skill1,
    "skill2": this.skill2,
    "skill3": this.skill3,
    "date" : this.cValue
    }

    console.log(this.cValue);
    console.log(this.obj)
    this.http.post("http://localhost:8080/addProfile", this.obj, {responseType: 'text' }).subscribe((data) =>{
      alert(data);
      // console.error(data);
      // this.toasterService.pop('success',data);
    },(err)=>{
      console.log(err);
    });
  }

}
