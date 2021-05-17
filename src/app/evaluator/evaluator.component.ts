import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';

@Component({
  selector: 'app-evaluator',
  templateUrl: './evaluator.component.html',
  styleUrls: ['./evaluator.component.css']
})
export class EvaluatorComponent implements OnInit {
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
  evaluator: any;
  profileId;

  // ngDoCheck(): void {
  //   //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //   //Add 'implements DoCheck' to the class.
  //     this.http.get("http://localhost:8080/evaluator/"+this.evaluator).subscribe((evaluatorData)=>{
  //       console.log(evaluatorData);
  //       this.evaluatorProfilesArr = Object.keys(evaluatorData).map(index => {
  //         let e_person = evaluatorData[index];
  //         return e_person;
  //       })
  //     },
  //     (error)=>{
  //       console.log(error);
  //     });
  // }

  constructor(public http:HttpClient, public service:AppService, private ts:ToastrService) { }

  
  ngOnInit(): void {
    this.http.get("http://localhost:8080/getEvaluators").subscribe((evaluators)=>{
      console.log(evaluators);
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
    this.evaluator = evaluator.evalid;
    this.evalid['evalid'] = evaluator.evalid;
    console.log(evaluator.evalid);
    this.service.getEval(evaluator.evalid).subscribe((evaluatorData)=>{
      console.log(evaluatorData);
      this.evaluatorProfilesArr = Object.keys(evaluatorData).map(index => {
        let e_person = evaluatorData[index];
        return e_person;
      })
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
    console.log(this.updatedProfile);
    if(this.updatedProfile['status']==='hired' || this.updatedProfile['status'] === 'not hired'){
      if(this.updatedProfile['comments'] ===''){
        this.ts.warning("Please fill status and comments",'title');
      }
      else{
        this.http.put("http://localhost:8080/statusupdate",this.updatedProfile,{responseType: 'text' }).subscribe((data)=>{
            this.ts.success(data);
          // this.reqProfiles(this.evalid['evalid']);
          this.service.getEval(this.evalid['evalid']).subscribe((evaluatorData)=>{
            this.evaluatorProfilesArr = Object.keys(evaluatorData).map(index => {
              let e_person = evaluatorData[index];
              return e_person;
            })
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
      console.log("button",this.buttonClick)
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
    console.log(value)
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
      console.log("button",this.buttonClick)
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
    console.log(value);
    // this.updatedProfile['comments'] = value;
  }
  editFilds(profile){
    // console.log('Before Edit',this.edit);
    this.edit = true;
    // console.log('After Edit',this.edit);
    console.log("Edit",profile);
    this.profileId = profile.id;
    console.log(this.profileId);
  }
}

