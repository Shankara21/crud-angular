import { ControlService } from 'src/app/Services/control.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(private ControlService: ControlService) { }

  public chart: any;

  // Category
  category: any[] = [];
  nameCategory: any = []
  countCategory: any = []

  // Status
  status: any[] = [];
  nameStatus: any = []
  countStatus: any = []

  ngOnInit(): void {

    //?\\//\\//\\//\\//\\//\\Count by Category//\\//\\//\\//\\//\\//\\//\\
    this.ControlService.countByCategory().subscribe((res: any) => {
      this.category = res;
      this.category.forEach((element: any) => {
        this.nameCategory.push(element.Category.name);
        this.countCategory.push(element.total);
      });
      this.polarArea(this.nameCategory, this.countCategory, 'countByCategory');
    })
    //!\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

    //?\\//\\//\\//\\//\\//\\Count by Status//\\//\\//\\//\\//\\//\\//\\//\\
    this.ControlService.countByStatus().subscribe((res: any) => {
      // console.log(res);
      this.status = res;
      console.log(this.status);
      this.status.forEach((element: any) => {
        this.nameStatus.push(element.status);
        this.countStatus.push(element.total);
      });
      // console.log('res');
      // console.log(res);
      console.log(this.nameStatus);
      console.log(this.countStatus);
      this.pieChart(this.nameStatus, this.countStatus, 'countByStatus');
    })
    //!\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
  }
  polarArea(label: any, data: any, target:any) {
    this.chart = new Chart(target, {
      type: 'polarArea',
      data: {
        labels: label,
        datasets: [{
          label: 'Total',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }
  pieChart(label: any, data: any, target:any) {
    this.chart = new Chart(target, {
      type: 'pie',
      data: {
        labels: label,
        datasets: [{
          label: 'Total',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }

}
