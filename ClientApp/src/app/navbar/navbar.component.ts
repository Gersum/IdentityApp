import { Component } from '@angular/core';
import { AccountService } from '../account/account.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  collapsed = true;
  isDarkMode: boolean = false;
  defaultImagePath = '';

  constructor(public accountService: AccountService) {

   }

  logout() {
    this.accountService.logout();
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
  
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  public createImgPath = (serverPath: string) => { 

    // var result = `http://localhost:5296/${serverPath}`;
      // console.log("serverPath : on admin comp", serverPath)
    
    return `http://localhost:5296/${serverPath}`;   

  }

  
}
