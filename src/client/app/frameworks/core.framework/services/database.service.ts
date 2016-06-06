import {Injectable, Inject} from '@angular/core';
import {FIREBASE} from '../../core.framework/index';

@Injectable()
export class DatabaseService {
  database: any;
  onSync: Function;
  constructor(@Inject(FIREBASE) firebase:any) {
    console.log('Constructing DatabaseService');
    this.database = new firebase('https://ng2-test-107d1.firebaseio.com/');
  }

  sync(path: string, onValueReceived: Function) {
    this.onSync = (snapshot:any) => onValueReceived(snapshot.val());
    this.database.child(path).on('value', this.onSync);
  }

  addChild(path: string, data:any, callback?:Function) {
    this.database.child(path).push(data, (err:any) => {
      if (callback && !err) {
        callback();
      }
    });
  }
}
