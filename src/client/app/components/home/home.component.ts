// libs
import {Store} from '@ngrx/store';

// app
import {FormComponent} from '../../frameworks/core.framework/index';
import {NameListService, DatabaseService} from '../../frameworks/app.framework/index';

@FormComponent({
  selector: 'sd-home',
  templateUrl: './app/components/home/home.component.html',
  styleUrls: ['./app/components/home/home.component.css']
})
export class HomeComponent {
  public newName: string = '';
  constructor(private store: Store<any>, public nameListService: NameListService, public databaseService: DatabaseService) {
    this.databaseService.sync((result:any) => {
      console.log('Event type: ' + result.type);
      console.log('Key: ' + result.key);
      console.log('Value: ' + JSON.stringify(result.value));
      let namesMap = result.value;
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
}
