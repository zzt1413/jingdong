import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonlPage } from './personl';

@NgModule({
  declarations: [
    PersonlPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonlPage),
  ],
})
export class PersonlPageModule {}
