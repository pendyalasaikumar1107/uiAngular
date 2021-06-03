import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, DoCheck } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-evaluator',
  templateUrl: './evaluator.component.html',
  styleUrls: ['./evaluator.component.css']
})
export class EvaluatorComponent implements OnInit,DoCheck {
  EvaluatorsArr: any[];
  data={};
  edit = false;
  clearselect = "Choose Status";
  clearreasonselect= '';
  cleartext = '';
  evaluatorProfilesArr: any[];
  evalid={};
  updatedProfile={
    'id':null,
    'status':'Choose status',
    'comments':''
  };
  statusselect="";
  reason ="";
  selectvalue = false;
  buttonWork = false;
  textValue = false;
  buttonClick = true;
  nothiredval = false;
  textareaval = true;
  textvalue1;
  selectvalue1;
  evaluator;
  profileId;


  constructor(private router: Router,public http:HttpClient, public service:ApiService, private ts:ToastrService) { }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  ngDoCheck(): void {
    var val = this.router.url.split('/')[1];
    // console.log("val",val)
    let value = sessionStorage.getItem('user');
    if(!value){
      this.router.navigateByUrl('login');
    } 
  }

  
  ngOnInit(): void {
    this.service.getEvaluators().subscribe((evaluators)=>{
      // console.log(evaluators);
      this.EvaluatorsArr = Object.keys(evaluators).map(index => {
        let person = evaluators[index];
        return person;
      });
    }) 
    
  }
  showModel(profile){
    this.data = profile;
  }

  reqProfiles(evaluator){
    this.evaluator = evaluator.eval_name;
    this.evalid['evalid'] = evaluator.evalid;
    // console.log(evaluator['evalname']);
    this.updatedProfile['evalname'] = evaluator['evalname'];
    // console.log(evaluator.evalid)
  
    this.service.getEval(evaluator.evalid).subscribe((evaluatorData)=>{
      // console.log("eval data",evaluatorData);
      if(!evaluatorData){
        this.ts.warning("No Profiles are present");
        this.evaluatorProfilesArr = null;
      }
      else{
        this.evaluatorProfilesArr = Object.keys(evaluatorData).map(index => {
          let e_person = evaluatorData[index];
          return e_person;
        })
      }
    },
    (error)=>{
      console.log(error);
    });
  }

  sendUpdatedProfile(profile){
    this.edit = false;
    this.nothiredval = false;
    this.textareaval = true;
    // console.log(this.evalid['evalid']);
    // console.log("Profile Id",profile.id)
    this.updatedProfile['id'] = profile.id;
    // console.log("DATA ",this.updatedProfile['comments']);
    // console.log("updated profile",this.updatedProfile);
    if(this.updatedProfile['status']==='hired' || this.updatedProfile['status'] === 'not hired'){
      if(this.updatedProfile['comments'] ===''){
        this.ts.warning("Please fill status and comments",'title');
      }
      else{
        this.service.updateStatus(this.updatedProfile).subscribe((data)=>{
            this.ts.success(data);
          // this.reqProfiles(this.evalid['evalid']);
          this.service.getEval(this.evalid['evalid']).subscribe((evaluatorData)=>{
            if(evaluatorData){
              this.evaluatorProfilesArr = Object.keys(evaluatorData).map(index => {
                let e_person = evaluatorData[index];
                return e_person;
              })
            }
            else{
              this.evaluatorProfilesArr = null;
            }
          });
        });
      }
    }
  //   if(this.updatedProfile['status']==='not hired')
  }


  select(value) {
    this.selectvalue1 = value;
    if(value === "not hired"){
      this.nothiredval = true;
      this.textareaval = false;
    }
    else{
      this.textareaval = true;
      this.nothiredval = false;
    }
    if(this.textvalue1!== '' && this.selectvalue1!==''){
      this.buttonClick = false;
      // console.log("button",this.buttonClick)
    }
    else{
      this.buttonClick = true;
    }
    if(value == "Choose status"){
      this.selectvalue= true;
    }
    else{
      this.selectvalue= false;
    }
    // console.log(value)
    this.updatedProfile['status'] = value;
    // this.updatedProfile['eval_name'] = value;
  }

  selectreason(value){
    this.updatedProfile['comments'] = value;
  }

  textarea(value){
    this.textvalue1 = value
    if(this.textvalue1 !== '' && this.selectvalue1 !== ''){
      this.buttonClick = false;
      // console.log("button",this.buttonClick)
      this.updatedProfile['comments'] = value;
    }
    else{
      this.buttonClick = true;
    }
    if(value === ""){
      this.textValue= true;
    }
    else{
      this.textValue = false;
    }
    // console.log(value);
    // this.updatedProfile['comments'] = value;
  }
  editFilds(profile){
    // console.log('Before Edit',this.edit);
    this.edit = true;
    // console.log('After Edit',this.edit);
    // console.log("Edit",profile);
    this.profileId = profile.id;
    // console.log(this.profileId);
  }
}

