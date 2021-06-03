import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, DoCheck } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import readXlsxFile from 'read-excel-file';

@Component({
  selector: 'app-rmg',
  templateUrl: './rmg.component.html',
  styleUrls: ['./rmg.component.css']
})
export class RMGComponent implements OnInit,DoCheck {
  isLogined= false;
  skillsArr = [];
  skills:string = '';
  id;
  name:String = '';
  profileorigin ='';
  mobileno="";
  location="";
  experience="";
  skill1="";
  skill2="";
  skill3="";
  tagContainer;
  input;
  oneProfile = false;
  excelData: any;
  constructor(private router: Router ,public http:HttpClient, private ts:ToastrService, private apiService: ApiService) {
  }
  ngDoCheck(): void {
    var val = this.router.url.split('/')[1];
    // console.log("val",val)
    let value = sessionStorage.getItem('user');
    if(!value){
      this.router.navigateByUrl('login');
    }
  }
  
  checked:boolean= false;
  ngOnInit(): void { 

    
    // console.log("lead",value);
    
  }
  
  getSkill(skill){
      this.skillsArr.push(skill);
      this.skills = '';
  }
  
  GetStats(isChecked: boolean){
    this.checked = isChecked;
    if(this.checked){
      this.profileorigin = "TCS"
    }
    else{
      this.profileorigin = ""
    }
  }
  // JSON.stringify(obj);
  obj={}
  sendProfile(){
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
    }

    this.apiService.sendProfile(this.obj).subscribe((data)=>{
      if (data === 'success'){
        this.ts.success("Profile Uploaded",'title');
      }
      if(data === 'Sorry'){
        this.ts.error("Profile with same ID already exists");
      }
    },(err)=>{
      console.log(err);
    });
  }

  excelRead(e: any){
    console.log("file",e.value);
    let fileReaded:any;
    fileReaded = e.target.files[0];
    let type = e.target.files[0].name.split('.').pop();

    const schema ={
      'ID':{
        prop:'id',
        type: String,
        required: false
      },
      'Name':{
        prop:'name',
        type: String,
        required: true
      },
      'vendor':{
        prop:'vendor',
        type: String,
        required: true
      },
      'Contact':{
        prop:'mobileno',
        type: String,
        required: true
      },
      'Location':{
        prop:'location',
        type: String,
        required: true
      },
      'Experience':{
        prop:'experience',
        type: String,
        required: true
      },
      'Skills':{
        prop:'skill1',
        type: String,
        required: true
      }
    };

    readXlsxFile(e.target.files[0],{schema}).then((result: any) => {
      if(result.rows){
        for(let i of result.rows){
          if(!i.id){
            i['id'] = 0;
            // console.log(i);
          }
        }
        console.log("outside",result.rows);
        this.excelData = result.rows;
      }
      // console.log(result);
    }).catch((err: any) => {
      console.log(err);
    });
  }
  checkBox(check:boolean){
    this.oneProfile = !this.oneProfile;
    // console.log("checkBox",check);
  }
  UploadFile(){
    // console.log("excelData",this.excelData);
    this.apiService.uploadFile(this.excelData).subscribe((res)=>{
      this.ts.success(res);
    },(err)=>{
      this.ts.error(err);
    })
  }
 
}