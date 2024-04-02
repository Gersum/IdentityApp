import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterWithThirdPartyComponent } from './register-with-third-party/register-with-third-party.component';
import { AdminModule } from '../admin/admin.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ConfirmEmailComponent,
    SendEmailComponent,
    ResetPasswordComponent,
    RegisterWithThirdPartyComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    AdminModule
  ]
})
export class AccountModule { }
