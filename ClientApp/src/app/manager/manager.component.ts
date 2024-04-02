import { Component } from '@angular/core';
import { ManagerService } from './manager.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {

  message: string | undefined;

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    this.managerService.getPlayers().subscribe({
      next: (respose: any) => this.message = respose.value.message,
      error: error => console.log(error)
    })
  }

}
