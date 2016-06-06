// libs
import {Store} from '@ngrx/store';

// app
import {FormComponent} from '../../frameworks/core.framework/index';
import {NameListService} from '../../frameworks/app.framework/index';
import {DatabaseService} from '../../frameworks/core.framework/index';

@FormComponent({
  selector: 'sd-home',
  templateUrl: './app/components/home/home.component.html',
  styleUrls: ['./app/components/home/home.component.css']
})
export class HomeComponent {
  public newName: string = '';
  constructor(private store: Store<any>, public nameListService: NameListService, public databaseService: DatabaseService) {
    this.databaseService.sync('/names', (result:any) => {
      let namesMap = result;
      let namesArray: string[] = [];
      for (var key in namesMap) {
        namesArray.push(namesMap[key].first);
      }
      this.nameListService.setNames(namesArray);
    });
  }

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): void {
    this.databaseService.addChild('/names', { first: this.newName }, () => {
      this.newName = '';
    });
  }

  auth():void {
    this.databaseService.login('scott@entercastle.com', 'fakepassword1', () => {
      console.log('Is authed?', this.databaseService.getAuthedUserID());
    });
  }

  unauth():void {
    this.databaseService.logout();
    console.log('Is authed?', this.databaseService.getAuthedUserID());
  }
}
