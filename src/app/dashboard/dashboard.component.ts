import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // pieChart = new Chart({
  //   chart: {
  //     type: 'pie',
  //     plotShadow: false,
  //   },

  //   credits: {
  //     enabled: false,
  //   },

  //   plotOptions: {
  //     pie: {
  //       innerSize: '99%',
  //       borderWidth: 10,
  //       borderColor: '',
  //       slicedOffset: 10,
  //       dataLabels: {
  //         connectorWidth: 0,
  //       },
  //     },
  //   },

  //   title: {
  //     verticalAlign: 'middle',
  //     floating: true,
  //     text: 'Diseases',
  //   },

  //   legend: {
  //     enabled: false,
  //   },

  //   series: [
  //     {
  //       type: 'pie',
  //       data: [
  //         { name: 'COVID 19', y: 1, color: '#eeeeee' },
  //         { name: 'HIV/AIDS', y: 2, color: '#393e46' },
  //         { name: 'EBOLA', y: 3, color: '#00adb5' },
  //         { name: 'DISPORA', y: 4, color: '#eeeeee' },
  //         { name: 'DIABETES', y: 5, color: '#506ef9' },
  //       ],
  //     },
  //   ],
  // });
}
