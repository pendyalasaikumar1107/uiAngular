import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';


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
  dataArr2 = [];
  newnojoin: any;
  newnotavalable: any;
  newmismatch: any;
  newgap: any;
  newjunior: any;
  newnothired: number;
  MonthArr=[];
  Mnewgap: number;
  Mnewnothired: number;
  Mnewjunior: number;
  Mnewmismatch: number;
  Mnewnotavalable: number;
  Mnewnojoin: number;
  MonthData = [];
  MonthShow = false;
  TodayShow = false;
  
  constructor(public http:HttpClient, public service:AppService, private ts:ToastrService) {
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
      console.log("data",data);
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
      this.ts.success('updatedprofile','title',
      {timeOut:1000});
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
      this.TodayShow = true;
      this.hidechart = false;
    switch (filter) {
      case 'today':
        this.mydate = new Date();
        this.Dvalue = formatDate(this.mydate, 'yyyy-MM-dd', 'en-US');
        // console.log("date",typeof(Date(this.Dvalue)));
        // let date = new Date('2021-05-09');
        // console.log("date",date)
        // let newDate = '2021-05-09';
        this.service.getProfilesByDate(this.Dvalue).toPromise().then(res=>{
          console.log("Res",res[0])
          setTimeout(()=>{
            this.todayData.push(res[0]);
            this.todayData.push(res[1]);
            this.todayData.push(res[2]);
            this.todayData.push('today');
            this.todayData.push(res[0]-res[1]-res[2]);
          },1000);
        })
        let count=0;
        let newnothired = 0;
        let newjunior = 0;
        let newgap = 0;
        let newmismatch = 0;
        let newnotavalable = 0;
        let newnojoin = 0;
        for(let profile in this.Profiles){
          if(this.Profiles[profile].date === this.Dvalue){
            if(this.Profiles[profile]['status'] === 'not hired'){
              switch (this.Profiles[profile]['comments']) {
                  case "Too junior":
                    newjunior++;
                    break;
                  case "Competency gap":
                    newgap++;
                    break;
                  case "Skills mismatch":
                    newmismatch++;
                    break;
                    case "not Available":
                    newnotavalable++;
                    break;
                    case "Associate not willing to Join":
                    newnojoin++;
                    break;
                  default:
                    break;
              }
              newnothired++;
            }
          }
        }
        this.newgap = newgap;
        this.newnothired = newnothired;
        this.newjunior = newjunior;
        this.newmismatch = newmismatch;
        this.newnotavalable = newnotavalable;
        this.newnojoin = newnojoin;
        setTimeout(()=>{
            this.dataArr2.push(this.newnothired);
            this.dataArr2.push(this.newjunior);
            this.dataArr2.push(this.newgap);
            this.dataArr2.push(this.newmismatch);
            this.dataArr2.push(this.newnotavalable);
            this.dataArr2.push(this.newnojoin);
          },1000)
      break;
      case 'monthly':
        console.log('You clicked: ' + value.target.innerHTML+" filter");
        break;
        case 'weekly':
        console.log('You clicked: ' + value.target.innerHTML+" filter");
        break;
    }
  }
      
  MonthFilter(value){
    if(this.TodayShow === false){
      // this.hidechart = !this.hidechart;
      this.MonthShow = true;
      this.hidechart = false;
    }

    console.log("today ",this.TodayShow, " month ",this.MonthShow," OverAll ",this.hidechart)

    console.log("Month",value);
    this.service.getTotalProfilesinMonth(value).subscribe((data)=>{
      console.log(data[0]);
      if(data[0]){
        setTimeout(()=>{
          this.MonthData.push(data[0]);
          this.MonthData.push(data[1]);
          this.MonthData.push(data[2]);
          this.MonthData.push('Monthly');
          this.MonthData.push(data[0]-data[1]-data[2]);
        },1000);
      }
      else{
        this.ts.error('No Records Present For this Month','Title')
      }
    })
    this.service.getProfilesByMonth(value).subscribe((profileId)=>{
      console.log("Month profiles",profileId);
      if(profileId){
        console.log("empty");
      }
      else{
        console.log("notEmpty");
      }
      let newnothired1 = 0;
        let newjunior1 = 0;
        let newgap1 = 0;
        let newmismatch1 = 0;
        let newnotavalable1 = 0;
        let newnojoin1 = 0;
      for(let profile in this.Profiles){
        for(let p in profileId){
          // console.log(this.Profiles[profile].id,  profileId[p]);
          if(this.Profiles[profile].id === profileId[p]){
            if(this.Profiles[profile]['status'] === 'not hired'){
              console.log(this.Profiles[profile]['comments']);
              switch (this.Profiles[profile]['comments']) {
                case "Too junior":
                  newjunior1++;
                  break;
                  case "Competency gap":
                  newgap1++;
                  break;
                  case "Skills mismatch":
                  newmismatch1++;
                  break;
                  case "not Available":
                    newnotavalable1++;
                  break;
                  case "Associate not willing to Join":
                  newnojoin1++;
                  break;
                  default:
                    break;
              }
              newnothired1++;
            }
          }
        }
      }
      this.Mnewgap = newgap1;
        this.Mnewnothired = newnothired1;
        this.Mnewjunior = newjunior1;
        this.Mnewmismatch = newmismatch1;
        this.Mnewnotavalable = newnotavalable1;
        this.Mnewnojoin = newnojoin1;
        setTimeout(()=>{
            this.MonthArr.push(this.Mnewnothired);
            this.MonthArr.push(this.Mnewjunior);
            this.MonthArr.push(this.Mnewgap);
            this.MonthArr.push(this.Mnewmismatch);
            this.MonthArr.push(this.Mnewnotavalable);
            this.MonthArr.push(this.Mnewnojoin);
          },1000)
    })
    
  }
  clearFilter(){
    this.TodayShow = false;
    this.MonthShow = false;
    this.hidechart = true;
  }
}

