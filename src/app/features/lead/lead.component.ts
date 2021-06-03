import { HttpClient } from '@angular/common/http';
import { Component, OnInit, DoCheck } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { Profiles } from 'src/app/models/profile.modal';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit,DoCheck {
  // profile.evalassigned.evalname = "";

  fileName= "EvaluationReport.xlsx";

  month='';
  hidechart= false;
  evalname = '';
  Eevalname = [];
  dummy = "rohan";
  color = true;
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
  dataArr;
  todayData;
  MonthData;
  MonthShow = false;
  TodayShow = false;
  
  constructor(private router: Router, public http:HttpClient, public service:ApiService, private ts:ToastrService, private apiService:ApiService) {
  }
  ngDoCheck(): void {
    var val = this.router.url.split('/')[1];
    // console.log("val",val)
    let value = sessionStorage.getItem('user');
    if(!value){
      this.router.navigateByUrl('login');
    }
  }
  page:number = 1;
  Profiles: Profiles;
  sampleProfile: Profiles;
  
  hired = 0;
  totalLength = 0;


  ngOnInit(): void {
    // console.log("Nav URL",this.router.url.split('/')[1]);
    
    // console.log("lead",value);
    
    // this.ts.success("Profile Uploaded",'title');
    this.apiService.getAllProfileData().subscribe(data =>{
      // console.log("All Profiles",data);
      this.dataArr = data;
      if(data){
        this.hidechart = true;
      }
    })
    this.apiService.getProfileData();
    this.apiService.profiles$.subscribe((data) =>{
      this.sampleProfile = data;
    this.Profiles = data;
    // console.log("Profiles",this.Profiles)
    // console.log("Sample Profiles",this.sampleProfile)
    })
    this.toggle = !this.toggle;
    this.service.getEvaluators().subscribe((evaluators)=>{
      this.EvaluatorsArr = Object.keys(evaluators).map(index => {
        let person = evaluators[index];
        return person;
      });
    })
  }
  updateEval(profile){
    // console.log(profile);
    this.updatedProfile.id= profile;
    // console.log("updated Profile",this.updatedProfile);
    if(this.updatedProfile.evalid !==null && this.updatedProfile.evalname !==''){

      this.service.updateProfile(this.updatedProfile).subscribe((updatedprofile)=>{
        this.ts.success('updatedprofile','',{timeOut:1000});
      })
    }
    else{
      this.ts.warning('evaluator name or evaluator id can not be empty')
    }
    // for(let profile in this.Profiles){
    //       if(this.updatedProfile.id === this.Profiles[profile].id){
    //         this.Profiles[profile]['evaluator'] = this.updatedProfile.evalname;
    //         console.log(this.Profiles[profile]);
    //       }
    //   }
      // console.log(this.Profiles)
    // }
  }

  // To get select value and assign to updatedProfile Object
  handle(value) {
    // console.log('evalArr',value);
    for(let e in this.EvaluatorsArr){
      if(this.EvaluatorsArr[e].evalname == value){
        this.updatedProfile.evalid = this.EvaluatorsArr[e].evalid;
      }
    }
    this.updatedProfile.evalname = value;
  }
  

  getEval(evaluator){
    // console.log("Evaluator Name",evaluator)
    this.updatedProfile['evalid'] = evaluator;
  }
  // hidechartmethod(value){
  //   this.hidechart = !this.hidechart;
  //   // console.log("filter",value)
  // }
  gettodayValue(value){
    let filter=''
    this.clearFilter();
    filter = value.target.innerHTML;
    // console.log('You clicked: ' + filter);
      this.TodayShow = true;
    if(filter === 'Today') {
        this.service.getProfilesByDate().subscribe(res=>{
          // console.log("Res",res[0])
          // console.log("Res",res)
          if(res[0] === 0){
            this.TodayShow = false;
            this.todayData = 0
            this.ts.error("No Records Present");
          }
          else{
            this.todayData = res;
            this.todayData.push("Today");
            // console.log("Today",this.todayData[0]);
          }
        })
      }
  }
      
  MonthFilter(value){
      this.clearFilter();

    // console.log("today ",this.TodayShow, " month ",this.MonthShow," OverAll ",this.hidechart)
    this.month = value;
    // console.log("clicked",this.month);
    // console.log("Month",value);
    this.service.getTotalProfilesinMonth(value).subscribe((data)=>{
      // console.log("Month DATA",data);
      this.MonthShow = true;
      if(data[0]){
          this.MonthData = data;
          this.MonthData.push('Monthly');
          // console.log("MonthDATA",this.MonthData)
      }
      else{
        this.MonthShow = false;
        this.ts.error('No Records Present For this Month','Title')
      }
    })    
  }
  clearFilter(){
    this.TodayShow = false;
    this.MonthShow = false;
    this.hidechart = false;
    this.month = ''
  }
  overAll(){
    this.TodayShow = false;
    this.MonthShow = false;
    this.hidechart = true;
  }


  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }
}

