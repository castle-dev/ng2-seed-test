import {Injectable, Inject} from '@angular/core';
import {FIREBASE} from '../../core.framework/index';

@Injectable()
export class DatabaseService {
  private database:any;
  private auth:any;
  private onSync:Function;
  private userID:string;
  constructor(@Inject(FIREBASE) firebase:any) {
    console.log('Constructing DatabaseService');
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDb-rzp05RwVyGL5z5HkINjUWvRLvN-KHw",
      authDomain: "ng2-test-107d1.firebaseapp.com",
      databaseURL: "https://ng2-test-107d1.firebaseio.com",
      storageBucket: "ng2-test-107d1.appspot.com",
    };
    firebase.initializeApp(config);
    this.database = firebase.database();
    this.auth = firebase.auth();
  }

  sync(path: string, onValueReceived: Function):void {
    this.onSync = (snapshot:any) => onValueReceived(snapshot.val());
    this.database.ref(path).on('value', this.onSync);
  }

  addChild(path: string, data:any, callback?:Function):void {
    this.database.ref(path).push(data, (err:any) => {
      if (callback && !err) {
        callback();
      }
    });
  }

  login(email:string, password:string, callback?:Function):void {
    this.auth.signInWithEmailAndPassword(email, password).then((result:any) => {
      if (result.uid) {
        this.userID = result.uid;
        if (callback) { callback(); }
      }
    }).catch((err:any) => console.log(err));
  }

  logout():void {
    delete this.userID;
    this.auth.signOut();
  }

  getAuthedUserID():string|void {
    if (this.userID) {
      return this.userID;
    }
  }
}
