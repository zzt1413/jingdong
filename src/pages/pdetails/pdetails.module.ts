import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdetailsPage } from './pdetails';

@NgModule({
  declarations: [
    PdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PdetailsPage),
  ],
})
export class PdetailsPageModule {}
