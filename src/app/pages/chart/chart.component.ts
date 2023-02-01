import { ControlService } from 'src/app/Services/control.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'
import { FormGroup, FormControl } from '@angular/forms';

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


  // array of month
  month: any[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Income
  income: any[] = [];
  userName: any[] = [];
  totalSell: any[] = [];
  totalIncome: any[] = [];

  // Income 2
  income2: any[] = [];
  userName2: any[] = [];
  totalSell2: any[] = [];
  totalIncome2: any[] = [];
  incomebaru: any[] = [];
  userNamebaru: any[] = [];
  totalSellbaru: any[] = [];
  totalIncomebaru: any[] = [];

  // Income 3
  income3: any[] = [];
  month3: any[] = [];
  totalIncome3: any[] = [];
  newMonth: any[] = [];

  // testt
  test: any[] = [];

  form!: FormGroup;
  monthSelected: any = '';

  newBarchart: any;

  ngOnInit(): void {
    this.ControlService.filterIncomeByMonth(this.monthSelected).subscribe((res: any) => {
      this.income2 = res[0];
      this.income2.forEach((item: any) => {
        this.userName2.push(item.username)
        this.totalSell2.push(item.total_qty)
        this.totalIncome2.push(item.income)
      })
      this.newBarchart = new Chart("income2", {
        type: 'bar',
        data: {
          labels: this.userName2,
          datasets: [{
            label: 'Rp.',
            data: this.totalIncome2,
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
    })
    this.ControlService.testingIncome().subscribe((res: any) => {
      this.income = res[0];
      this.income.forEach((item: any) => {
        this.userName.push(item.username)
        this.totalSell.push(item.total_qty)
        this.totalIncome.push(item.income)
      })
      // this.barChart(this.userName, this.totalIncome, 'countQtyBar')
      this.polarArea(this.userName, this.totalSell, 'countQtyBar')
    })
    this.ControlService.countIncomeByMOnth().subscribe((res: any) => {
      this.income3 = res[0];
      this.income3.forEach((item: any) => {
        this.month3.push(item.month)
        this.totalIncome3.push(item.income)
      })
      this.newMonth = this.month3.map((item: any) => {
        switch (item) {
          case 1:
            return "Januari";
          case 2:
            return "Februari";
          case 3:
            return "Maret";
          case 4:
            return "April";
          case 5:
            return "Mei";
          case 6:
            return "Juni";
          case 7:
            return "Juli";
          case 8:
            return "Agustus";
          case 9:
            return "September";
          case 10:
            return "Oktober";
          case 11:
            return "November";
          case 12:
            return "Desember";
          default:
            return "Tidak ada";
        }
      });
      this.linechart(this.newMonth, this.totalIncome3, 'incomeWithLine')
      // this.pieChart(this.nameStatus, this.countStatus, 'countStatus')
    })
    this.form = new FormGroup({
      month: new FormControl(''),
    })
    // this.filterByUser();
  }

  filterByUser() {
    this.userNamebaru.splice(0)
    this.totalIncomebaru.splice(0)
    if (this.form.value.month == 'January') {
      this.form.value.month = 1
    } else if (this.form.value.month == 'February') {
      this.form.value.month = 2
    } else if (this.form.value.month == 'March') {
      this.form.value.month = 3
    } else if (this.form.value.month == 'April') {
      this.form.value.month = 4
    } else if (this.form.value.month == 'May') {
      this.form.value.month = 5
    } else if (this.form.value.month == 'June') {
      this.form.value.month = 6
    } else if (this.form.value.month == 'July') {
      this.form.value.month = 7
    } else if (this.form.value.month == 'August') {
      this.form.value.month = 8
    } else if (this.form.value.month == 'September') {
      this.form.value.month = 9
    } else if (this.form.value.month == 'October') {
      this.form.value.month = 10
    } else if (this.form.value.month == 'November') {
      this.form.value.month = 11
    } else if (this.form.value.month == 'December') {
      this.form.value.month = 12
    }
    this.ControlService.filterIncomeByMonth(this.form.value.month).subscribe((res: any) => {
      this.income2 = res[0];
      this.income2.forEach((item: any) => {
        this.userNamebaru.push(item.username)
        this.totalSellbaru.push(item.total_qty)
        this.totalIncomebaru.push(item.income)
      })
      if (this.newBarchart != null) {
        this.newBarchart.destroy()
      }
      this.newBarchart = new Chart("income2", {
        type: 'bar',
        data: {
          labels: this.userNamebaru,
          datasets: [{
            label: 'Rp.',
            data: this.totalIncomebaru,
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
          },
          animation: {
            duration: 2000,
            easing: 'easeOutBounce'
          }
        }
      })
    })

  }
  polarArea(label: any, data: any, target: any) {
    this.chart = new Chart(target, {
      type: 'doughnut',
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

      }
    })
  }
  linechart(label: any, data: any, target: any) {
    this.chart = new Chart(target, {
      type: 'line',
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
            beginAtZero: false
          }
        }
      }
    })
  }

}
