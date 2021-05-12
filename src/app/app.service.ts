import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    evaluatorProfilesArr: any[];
    constructor(public http: HttpClient){}

    public getEval(evalid){
        return this.http.get("http://localhost:8080/evaluator/"+evalid);
        // .subscribe((evaluatorData)=>{
        //     console.log(evaluatorData);
        //     // this.evaluatorProfilesArr = Object.keys(evaluatorData).map(index => {
        //     //   let e_person = evaluatorData[index];
        //     //   return e_person;
        //     // })
        //   },
        //   (error)=>{
        //     console.log(error);
        //   });
    }
    public getProfilesByDate(date){
        return this.http.get("http://localhost:8080/date/"+date);
    }
}