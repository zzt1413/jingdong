import { NgModule } from '@angular/core';
import { ActionsheetComponent } from './actionsheet/actionsheet';

import { BrowserModule } from '@angular/platform-browser';
import { UsersComponent } from './users/users';
@NgModule({
	declarations: [ActionsheetComponent,
    UsersComponent],
	imports: [BrowserModule],
	exports: [ActionsheetComponent,
    UsersComponent]
})
export class ComponentsModule {}
