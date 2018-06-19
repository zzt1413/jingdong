import { Component } from '@angular/core';

/**
 * Generated class for the UsersComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'users',
  templateUrl: 'users.html'
})
export class UsersComponent {

  text: string;

  public list = [];
  constructor() {
    console.log('Hello UsersComponent Component');
    this.text = 'tian q';
    this.list = ["111","222","333"];
  }

}
