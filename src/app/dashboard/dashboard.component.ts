import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { AppComponent } from '../app.component';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  data1: any = [];
  combinedData: any = [];
  wasteDataById: any = {};
  pieChart: Chart =new Chart;

  colorMapping: any = {};

  constructor(private http: HttpClient, private app: AppComponent) {
    this.loadDataFromServer();
  }

  loadDataFromServer() {
    const url = `${this.app.baseUrl}getDailyData/DRIVERS`;
    this.http.get(url).subscribe((data: any) => {
      this.data1 = data;
      this.combinedData = this.data1;
      this.wasteDataById = this.groupDataById(this.combinedData);
      this.createPieChart();
    });
  }

  groupDataById(data: any[]) {
    const result: any = {};
    data.forEach(item => {
      const id = item.userName;
      if (!result[id]) {
        result[id] = { dryTotal: 0, wetTotal: 0 };
        this.colorMapping[id] = this.getRandomColor();
      }
      result[id].dryTotal += item.dry;
      result[id].wetTotal += item.wet;
    });
    return result;
  }
  createPieChart() {
    const chartData = Object.keys(this.wasteDataById).map(id => {
      return {
        name: `Name: ${id} - Dry`,
        y: this.wasteDataById[id].dryTotal,
        color: this.colorMapping[id],
      };
    }).concat(Object.keys(this.wasteDataById).map(id => {
      return {
        name: `Name: ${id} - Wet`,
        y: this.wasteDataById[id].wetTotal,
        color: this.colorMapping[id],
      };
    }));

    this.pieChart = new Chart({
      chart: {
        type: 'pie',
        plotShadow: false,
        events: {
          load: function () {
            this.reflow();
          },
        },
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          innerSize: '99%',
          borderWidth: 10,
          borderColor: '',
          slicedOffset: 10,
          dataLabels: {
            connectorWidth: 4,
          },
        },
      },
      title: {
        text: 'Waste Collected by Driver',
        align: 'center',
        verticalAlign: 'middle',
        floating: true,
        style: {
          fontSize: '18px',
          color: '#000',
        },
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          type: 'pie',
          data: chartData,
        },
      ],
    });
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
