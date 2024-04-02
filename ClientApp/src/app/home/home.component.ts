import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { AdminService } from '../admin/admin.service';


declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  roleUserCounts: { role: any; count: number }[] = [];
  userCounts: { [key: string]: number } | undefined;
  roles = ['Admin', 'Manager', 'Moderator', 'Player']; // Specify the desired roles


  pieChart = ChartType.PieChart;
  data: any[] = [];
  chartType: string = 'PieChart';
  columnNames = ['Users', 'Count'];
  width = 600;
  height = 400;
  chartOptions = {
    title: 'User Count by Role',
    pieHole: 0.4,
  };

  constructor(private adminService: AdminService) { }

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
    });
  }

  updateChartData() {
    this.data = [['Role', 'User Count'], ...this.roleUserCounts.map(({ role, count }) => [role, count])];
  }

  drawChart() {
    const chartData = google.visualization.arrayToDataTable(this.data);
    const chartContainer = document.getElementById('chartContainer');

    if (chartContainer !== null) {
      const chart = new google.visualization.PieChart(chartContainer);
      chart.draw(chartData, this.chartOptions);
    } else {
      console.error('chartContainer element not found');
    }
  }
}