import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { URLS } from '../constants/apiurls.constants';
import { Profiles } from '../models/profile.modal';
import { ProfileInt } from '../types/profile-response.type';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn:'root'
})
export class ApiService {
  uploadFile(fileData) {
    return this.http.post(this.url+"uploadFile",fileData,{responseType: 'text'});
  }

  sendProfile(obj: {}) {
    // console.log(this.url)
    return this.http.post(this.url+"addProfile", obj, {responseType: 'text' });
  }
  url: string;
  updateProfile(updatedProfile) {
    return this.http.put(this.url+"updateProfile",updatedProfile, {responseType: 'text' })
  }
  private profilesBehavSubject = new BehaviorSubject<Profiles>(null);
  profiles$ = this.profilesBehavSubject.asObservable();
  
  constructor(private http: HttpClient) {
    this.url = URLS.url;
   }
  
  getProfileData() {
    // this.url = URLS.url;
    // console.log("URL",this.url)
    this.http.get(this.url+"getProfiles", { responseType: 'json' }).pipe(
      map((data: ProfileInt) => {
        // console.log("service",data)
        this.profilesBehavSubject.next(new Profiles().deserialize(data));
        return this.profilesBehavSubject.getValue();
      })
      ).subscribe();
  }
  
  getEvaluators() {
    return this.http.get(this.url+"getEvaluators");
  }
  getData() {
    return this.profilesBehavSubject.getValue();
  }
  public getEval(evalid){
    return this.http.get(this.url+"evaluator/"+evalid);
  }
  public getProfilesByDate(){
    // console.log("date",date);
    // console.log("date type",typeof date);
    return this.http.get(this.url+"date");
  }

  public getTotalProfilesinMonth(data){
      return this.http.get(this.url+"month/"+data);
  }
  public getProfilesByMonth(data){
      return this.http.get(this.url+"monthprofiles/"+data);
  }
  public getAllProfileData(){
    // console.log("URL",this.url)
    return this.http.get(this.url+"allTimeFilter");
  }
  public updateStatus(value){
    return this.http.put(this.url+"statusupdate",value,{responseType: 'text' });
  }
}
