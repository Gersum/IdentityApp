import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberView } from '../shared/models/admin/memberView';
import { MemberAddEdit } from '../shared/models/admin/memberAddEdit';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<MemberView[]>(`${environment.appUrl}admin/get-members`);
  }

  getMember(id: string) {
    return this.http.get<MemberAddEdit>(`${environment.appUrl}admin/get-member/${id}`);
  }

  getApplicationRoles() {
    return this.http.get<string[]>(`${environment.appUrl}admin/get-application-roles`);
  }

  addEditMember(model: MemberAddEdit) {
    return this.http.post(`${environment.appUrl}admin/add-edit-member`, model);
  }

  lockMember(id: string) {
    return this.http.put(`${environment.appUrl}admin/lock-member/${id}`, {});
  }

  unlockMember(id: string) {
    return this.http.put(`${environment.appUrl}admin/unlock-member/${id}`, {});
  }

  deleteMember(id: string) {
    return this.http.delete(`${environment.appUrl}admin/delete-member/${id}`, {});
  }

  userCount() {
    return this.http.get(`${environment.appUrl}admin/users-count/`, {});
  }

  
  getUserCountsByRoles(roles: string[]) {
    const roleRequests = roles.map(role => this.getUserCountByRole(role));
    return Promise.all(roleRequests).then(counts => {
      const userCounts = {} as { [key: string]: number };
      roles.forEach((role, index) => {
        const count = counts[index] || 0; // Assign 0 if count is undefined
        userCounts[role] = count;
      });
      return userCounts;
    });
  }

  private getUserCountByRole(role: string) {
    return this.http.get<{ count: number }>(`${environment.appUrl}admin/usercount/${role}`).pipe(
      map(response => response.count || 0) // Assign 0 if count is undefined
    ).toPromise();
  }


  


  }

