import {Injectable} from '@angular/core';

var firebase = require('nativescript-plugin-firebase');

@Injectable()
export class DatabaseService {
  database: any;
  onSync: Function;
  constructor() {
    this.database = firebase;
    this.database.init({
      persist: true // Allow disk persistence. Default false.
    }).then((instance:any) => {
      console.log('firebase.init successful');
    }, (error:any) => {
      console.log('firebase.init error: ' + error);
    });
  }

  sync(onValueReceived: Function) {
    this.onSync = (result:any) => onValueReceived(result);
    this.database.addValueEventListener(this.onSync, '/names');
  }

  addChild(path: string, data:any, callback?:Function) {
    this.database.push(path, data).then(function (result:any) {
      console.log('created key: ' + result.key);
      if (callback) {
        callback(result.key)
      }
    });
  }
}
