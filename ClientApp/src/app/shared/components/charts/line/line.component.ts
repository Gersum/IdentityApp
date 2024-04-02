import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {
  @ViewChild('pieChartCanvas', { static: false }) pieChartCanvas!: ElementRef;

  lockedCount: number = 0;
  nonLockedCount: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUserLockedCounts();
   
  }

  getUserLockedCounts() {
    this.http.get<any>(`${environment.appUrl}admin/locked/count`).subscribe(
      (response) => {
        console.log('API Response - Locked members count:', response);
        this.lockedCount = response;
        this.getNonLockedCount();
        console.log('locked count:', this.lockedCount);
      },
      (error) => {
        console.log('API Error - get-members:', error);
      }
    );
  }

  getNonLockedCount() {
    if (this.lockedCount !== null) {
      this.http.get<any>(`${environment.appUrl}admin/users-count`).subscribe(
        (response) => {
          console.log('API Response - locked/count:', response.count);
          const totalCount = response.count;
          this.nonLockedCount = totalCount - this.lockedCount;

          console.log('total count:', totalCount);
          console.log('locked count:', this.nonLockedCount);

          this.createPieChart();
        },
        (error) => {
          console.log('API Error - locked/count:', error);
        }
      );
    }
  }

  createPieChart() {
    const pieChartCanvas = this.pieChartCanvas.nativeElement;
    const ctx = pieChartCanvas.getContext('2d');

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Locked Users', 'Non-Locked Users','Passive', 'Active' ],
        datasets: [
          {
            data: [this.lockedCount+3.3, this.nonLockedCount,6,6.6],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          },
        ],
      },
      options: {

        plugins: {

          legend: {
            display: false, // Optionally hide the legend
          },
          title: {
              display: true,
              text: 'Locked vs Unlocked'
          },

         
      },

      elements: {
        line: {
          borderWidth: 7
        }
      }
        
      },

      
    });

    // console.log('data:', this.lockedCount, this.nonLockedCount);
  }
}