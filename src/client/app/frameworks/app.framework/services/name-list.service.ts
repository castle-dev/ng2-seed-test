import {Injectable} from '@angular/core';

@Injectable()
export class NameListService {
  public names: string[];

  constructor() {
    this.names = [];
  }

  setNames(names: string[]): void {
    this.names = names;
  }
}
