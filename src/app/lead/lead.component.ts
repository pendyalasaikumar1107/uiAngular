import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { AppService } from '../app.service';


@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {
  hidechart = true;
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
  dataArr=[];
  dataArr1 = [];
  notHired: number;
  gap: number;
  junior: number;
  mismatch: number;
  notavalable: number;
  nojoin: number;
  mydate: Date;
  Dvalue: string;
  todayData=[];
  
  constructor(public http:HttpClient, public service:AppService) {
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
      let nothired = 0;
      for(let profile in this.Profiles){
        this.Profiles[profile]['status'] = "Waiting"; 
      }
      let count=0;
      let junior = 0;
      let gap = 0;
      let mismatch = 0;
      let notavalable = 0;
      let nojoin = 0;
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
              console.log(this.Profiles[profile]['comments']);
              switch (this.Profiles[profile]['comments']) {
                case "Too junior":
                  junior++;
                  break;
                case "Competency gap":
                  gap++;
                  break;
                case "Skills mismatch":
                  mismatch++;
                  break;
                  case "not Available":
                  notavalable++;
                  break;
                  case "Associate not willing to Join":
                  nojoin++;
                  break;
                default:
                  break;
              }
              nothired++;
            }
          }
        }
      }
      this.gap = gap;
      this.junior = junior;
      this.mismatch = mismatch;
      this.notavalable = notavalable;
      this.nojoin = nojoin;
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
      this.dataArr.push(this.totalLength);
      this.dataArr.push(this.hired);
      this.dataArr.push(this.notHired);
      this.dataArr.push(wait);
      this.dataArr1.push(this.notHired);
      this.dataArr1.push(this.junior);
      this.dataArr1.push(this.gap);
      this.dataArr1.push(this.mismatch);
      this.dataArr1.push(this.notavalable);
      this.dataArr1.push(this.nojoin);
    },1000) 
  }
  updateEval(profile){
    console.log(profile.id);
    this.updatedProfile.id= profile.id;
    this.http.put("http://localhost:8080/updateProfile",this.updatedProfile, {responseType: 'text' }).subscribe((updatedprofile)=>{
      alert(updatedprofile);
    })
    for(let profile in this.Profiles){
          if(this.updatedProfile.id === this.Profiles[profile].id){
            this.Profiles[profile]['evaluator'] = this.updatedProfile.evalname;
            console.log(this.Profiles[profile]);
          }
      }
      console.log(this.Profiles)
    // }
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
  // hidechartmethod(value){
  //   this.hidechart = !this.hidechart;
  //   // console.log("filter",value)
  // }
  gettodayValue(value){
    let filter=''
    filter = value.target.innerHTML;
    console.log('You clicked: ' + value.target.innerHTML);
    switch (filter) {
      case 'today':
        this.hidechart = !this.hidechart;
        this.mydate = new Date();
        this.Dvalue = formatDate(this.mydate, 'yyyy-MM-dd', 'en-US');
        // console.log("date",typeof(Date(this.Dvalue)));
        let date = new Date('2021-05-09');
        console.log("date",date)
        let newDate = '2021-05-09';
        this.service.getProfilesByDate(newDate).toPromise().then(res=>{
          console.log("Res",res[0])
          setTimeout(()=>{
            this.todayData.push(res[0]);
            this.todayData.push(res[1]);
            this.todayData.push(res[2]);
            this.todayData.push('today');
          },1000);
        })
        break;
        case 'weekly':
          console.log('Weekly Filter clicked: ' + value.target.innerHTML);
        break;
      default:
        break;
    }
  }
  MonthFilter(value){
    console.log("Month",value);
    
  }
}

