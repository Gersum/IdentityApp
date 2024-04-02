import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AddEditMemberComponent } from './add-edit-member/add-edit-member.component';
import { SharedModule } from '../shared/shared.module';
import { UploadComponent } from '../upload/upload.component';
import { PieComponent } from '../shared/components/charts/pie/pie.component';
PieComponent





@NgModule({
  declarations: [
    AdminComponent,
    AddEditMemberComponent,
    UploadComponent,
    
   
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],

  exports: [
    UploadComponent // Export the UploadComponent
  ]
})
export class AdminModule { }
