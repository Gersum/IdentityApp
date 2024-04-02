import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ValidationMessagesComponent } from './components/errors/validation-messages/validation-messages.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NotificationComponent } from './components/modals/notification/notification.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserHasRoleDirective } from './directives/user-has-role.directive';
import { ExpiringSessionCountdownComponent } from './components/modals/expiring-session-countdown/expiring-session-countdown.component';
import { PieComponent } from './components/charts/pie/pie.component';

import { GoogleChartsModule } from 'angular-google-charts';
import { LineComponent } from './components/charts/line/line.component';
import { BarComponent } from './components/charts/bar/bar.component';
import { AreaComponent } from './components/charts/area/area.component';




@NgModule({
  declarations: [
    NotFoundComponent,
    ValidationMessagesComponent,
    NotificationComponent,
    UserHasRoleDirective,
    ExpiringSessionCountdownComponent,
    PieComponent,
    LineComponent,
    BarComponent,
    AreaComponent,
  
  
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    
   
    GoogleChartsModule,
    

    ModalModule.forRoot()
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ValidationMessagesComponent,
    UserHasRoleDirective,
    PieComponent,
    LineComponent,
    BarComponent,
    AreaComponent,

  
  ]
})
export class SharedModule { }
