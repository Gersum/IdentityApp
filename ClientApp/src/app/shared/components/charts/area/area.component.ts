import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { SignalRService } from 'src/app/shared/signal.service';
declare var google: any;

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  roleUserCounts: { role: any; count: number }[] = [];
  userCounts: { [key: string]: number } | undefined;
  roles = ['Manager', 'Admin', 'Moderator', 'Player']; // Specify the desired roles

  data: any[] = [];
  chartType: any = 'AreaChart';
  columnNames = ['Users', 'Count'];
  width = 600;
  height = 400;
  chartOptions = {
    title: 'Current State of Users Roles ',
    pieHole: 0.4,
  };

  constructor(private adminService: AdminService, private signalRService: SignalRService) { }

  ngOnInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.adminService.getUserCountsByRoles(this.roles)
        .then((userCounts) => {
          this.userCounts = userCounts;
          this.roleUserCounts = Object.entries(userCounts).map(([role, count]) => ({
            role,
            count
          }));
          this.updateChartData();
          this.drawChart();
        })
        .catch((error) => {
          console.error('Error retrieving user counts:', error);
        });
      // Subscribe to real-time updates for user counts by role
      this.signalRService.userCountByRole$.subscribe(({ role, count }) => {
        console.log('Real-time update received for role:', role, 'count:', count);
        if (this.userCounts) {
          this.userCounts[role] = count;
          this.roleUserCounts = Object.entries(this.userCounts).map(([role, count]) => ({
            role,
            count
          }));
          this.updateChartData();
          this.drawChart();
        }
      });
    });
  }

  updateChartData() {
    this.data = [['Role', 'User Count'], ...this.roleUserCounts.map(({ role, count }) => [role, count])];
  }

  drawChart() {
    const chartData = google.visualization.arrayToDataTable(this.data);
    const chartContainer = document.getElementById('chartContainer4');

    if (chartContainer !== null) {
      const chart = new google.visualization.AreaChart(chartContainer);
      chart.draw(chartData, this.chartOptions);
    } else {
      console.error('chartContainer element not found');
    }
  }
}
