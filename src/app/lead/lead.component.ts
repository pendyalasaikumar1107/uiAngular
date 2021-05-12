import { LeadService } from './lead.service';
import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import {ChangeDetectorRef} from '@angular/core';



@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {
  color = true;
  Profiles=[];
  EvaluatorsArr;
  selvalue;
  Keys=[];
  private toggle : boolean = false;
  evaluator = '';
  updatedProfile={
    "id":null,
    "evalid":null,
    "evalname":''
  };
  uniq: any[];
  dataArr;
  notHired: number;
  
  constructor(public http:HttpClient, public leadService:LeadService) {
  }
  page:number = 1;
  
  hired = 0;
  totalLength = 0;

  ngOnInit(): void {
    
    this.http.get("http://localhost:8080/getProfiles").subscribe((data)=>{
      this.Profiles = Object.keys(data).map(index => {
        let person = data[index];
        return person;
      });
      this.totalLength = this.Profiles.length;
      var keysArr = Object.keys(this.Profiles[0]);
    }); 



    //code for adding status in lead table
    this.http.get("http://localhost:8080/getupdateprofile").subscribe((data)=>{
      // console.log("data",data)
      let nothired = 0;
      for(let profile in this.Profiles){
        this.Profiles[profile]['status'] = "Waiting"; 
      }
      let count=0;
      for(let d in data){
        for(let profile in this.Profiles){
          if(this.Profiles[profile]['id'] == data[d]["id"]){
            this.Profiles[profile]['status'] = data[d]['status'];
            this.Profiles[profile]['comments'] = data[d]['comments'];
            // console.log(this.Profiles[profile]);
            if(this.Profiles[profile].status === 'hired'){
              count++;
            }
            if(this.Profiles[profile]['status'] === 'not hired'){
              nothired++;
            }
          }
        }
      }
      this.hired = count;
      this.notHired = nothired;
    });
    
    this.toggle = !this.toggle;
    this.http.get("http://localhost:8080/getEvaluators").subscribe((evaluators)=>{
        for(let profile in this.Profiles){
          this.Profiles[profile]['evaluator'] = "";
      }
      this.EvaluatorsArr = Object.keys(evaluators).map(index => {
        let person = evaluators[index];
        return person;
      });
    })
    setTimeout(()=>{
      var wait = this.totalLength - this.hired - this.notHired;
      this.dataArr = [this.totalLength,this.hired,this.notHired,wait]
      // console.log("hired not hired",this.totalLength,this.hired,this.notHired);
    },1000) 
  }
  updateEval(profile){
    console.log(profile.id);
    this.updatedProfile.id= profile.id;
    this.http.put("http://localhost:8080/updateProfile",this.updatedProfile, {responseType: 'text' }).subscribe((updatedprofile)=>{
      alert(updatedprofile);
    })
    // console.log("Updated Obj",this.updatedProfile);
    for(let profile in this.Profiles){
      for(let up in this.updatedProfile){
          if(this.updatedProfile[up].id === this.Profiles[profile].id){
            this.Profiles[profile]['evalname'] = this.updatedProfile[up].evalname;
            console.log(this.Profiles[profile]);
          }
      }
    }
  }

  // To get select value and assign to updatedProfile Object
  handle(value) {
    // console.log('evalArr',this.EvaluatorsArr);
    for(let e in this.EvaluatorsArr){
      if(this.EvaluatorsArr[e].evalname == value){
        this.updatedProfile.evalid = this.EvaluatorsArr[e].evalid;
      }
    }
    this.updatedProfile.evalname = value;
  }
  

  getEval(evaluator){
    this.updatedProfile['evalid'] = evaluator;
  }
  
}

