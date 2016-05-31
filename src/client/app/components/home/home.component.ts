// libs
import {Store} from '@ngrx/store';

// app
import {FormComponent} from '../../frameworks/core.framework/index';
import {NameListService} from '../../frameworks/app.framework/index';

var firebase = require('nativescript-plugin-firebase');

@FormComponent({
  selector: 'sd-home',
  templateUrl: './app/components/home/home.component.html',
  styleUrls: ['./app/components/home/home.component.css']
})
export class HomeComponent {
  public newName: string = '';
  constructor(private store: Store<any>, public nameListService: NameListService) { 
    firebase.init({
      persist: true // Allow disk persistence. Default false.
    }).then(function (instance:any) {
      console.log("firebase.init done");
    }, function (error:any) {
      console.log("firebase.init error: " + error);
    });
  }
  
  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.nameListService.add(this.newName);
    firebase.push(
      '/names',
      { 'first': this.newName }
    ).then(function (result:any) {
      console.log("created key: " + result.key);
    });
    this.newName = '';
    return false;
  }
}
