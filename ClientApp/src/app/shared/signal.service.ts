import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private userCountByRoleSubject: Subject<{ role: string, count: number }> = new Subject<{ role: string, count: number }>();
  public userCountByRole$: Observable<{ role: string, count: number }> = this.userCountByRoleSubject.asObservable();

  constructor() { }

  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${environment.appUrl}admin/count`) // URL to your SignalR hub
      .build();

    this.hubConnection.start()
      .then(() => {
        console.log('SignalR connection started');
        this.registerServerEvents();
      })
      .catch(err => console.error('Error while starting connection: ' + err));
  }

  private registerServerEvents(): void {
    this.hubConnection.on('UserCountUpdated', (role: string, count: number) => {
      this.userCountByRoleSubject.next({ role, count });
    });
  }
}
