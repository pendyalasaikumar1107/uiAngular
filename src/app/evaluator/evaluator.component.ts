import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluator',
  templateUrl: './evaluator.component.html',
  styleUrls: ['./evaluator.component.css']
})
export class EvaluatorComponent implements OnInit {
  EvaluatorsArr: any[];
  data={};
  evaluatorProfilesArr: any[];
  updatedProfile={
    'id':null,
    'status':'Choose status',
    'comments':''
  };
  selectvalue = false;
  buttonWork = false;
  textValue = false;
  buttonClick = true;
  
  textvalue1;
  selectvalue1;
  evaluator: any;

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

  constructor(public http:HttpClient) { }

  
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
    console.log(evaluator.evalid);
    this.http.get("http://localhost:8080/evaluator/"+evaluator.evalid).subscribe((evaluatorData)=>{
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

  

  sendUpdatedProfile(){
    this.updatedProfile['id'] = this.data['id'];
    // this.updatedProfile['name'] = this.data['name'];
    console.log("DATA ",this.updatedProfile);
      this.http.put("http://localhost:8080/statusupdate",this.updatedProfile,{responseType: 'text' }).subscribe((data)=>{
        alert(data);
      });
      

      
  }


  select(value) {
    this.selectvalue1 = value;
    if(this.textvalue1!= '' && this.selectvalue1!=''){
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
  textarea(value){
    this.textvalue1 = value
    if(this.textvalue1 != '' && this.selectvalue1 != ''){
      this.buttonClick = false;
      console.log("button",this.buttonClick)
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
    this.updatedProfile['comments'] = value;
  }
}

