import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    obj = {
        rmg: false,
        lead: false,
        evaluator: false
    };

    constructor(private fs: AngularFirestore){
        // this.fs.collection('users');
    }

    getAuth(){
        return this.fs.collection('users');
      }

      value!: string;
    getProfile(name: string){

        switch(name){
            case 'rmg':
                this.obj.rmg = true;
                // console.log(this.obj.rmg);
                this.value = name;
                break;
            case 'lead':
                this.obj.lead = true;
                this.value = name;
                break;
            case 'evaluator':
                this.obj.evaluator = true;
                this.value = name;
                break;
            default:
                console.log('sorry no route present');
                break;
            }
        // value[name] = true;
        //    console.log("value",value)
        return this.value;
    }
    getStatus(){
        let obj1 = {}
        // console.log(this.value);
        return this.obj;
    }
}