import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyListingsPageRoutingModule } from './my-listings-routing.module';

import { MyListingsPage } from './my-listings.page';
import { MyListingsAddPageModule } from '../my-listings-add/my-listings-add.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyListingsPageRoutingModule,
    MyListingsAddPageModule
  ],
  declarations: [MyListingsPage]
})
export class MyListingsPageModule {}
