import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { AppComponent } from '../../app.component';

interface Driver {
  rf_id: string;
  username: string;
  email: string;
  contact: string;
  address1: string;
  address2: string;
  assignedRoute: string;
  pincode: string;
}

@Component({
  selector: 'app-driver-pie-chart',
  templateUrl: './driver-pie-chart.component.html',
  styleUrls: ['./driver-pie-chart.component.css']
})
export class DriverPieChartComponent implements OnChanges {
  @Input() driverlist: Driver[] = [];
  firstDriver: Driver | undefined;
  selectedDriver: Driver | undefined;
  driverData: any;
  searchRfid: string = '';
  driverChart!: Chart;

  constructor(private http: HttpClient, private app: AppComponent) {
    this.loadDriverData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['driverlist'] && this.driverlist.length > 0) {
      this.firstDriver = this.driverlist[0];
      this.selectedDriver = this.firstDriver;
    }
  }

  loadDriverData() {
    const url = `${this.app.baseUrl}driverLiveData`;
    this.http.get(url).subscribe((data) => {
      this.driverData = data;
      this.createDriverChart();
    });
  }

  createDriverChart() {
    if (this.driverData) {
      this.driverChart = new Chart({
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Driver Waste Data',
          margin: 10,
        },
        credits: {
          enabled: false,
        },
        series: [{
          type: 'pie',
          name: 'Waste Data',
          data: [{
            name: 'Wet Waste',
            y: this.driverData.wet,
            color: '#3498db',
          }, {
            name: 'Dry Waste',
            y: this.driverData.dry,
            color: '#e74c3c',
          }]
        }]
      });
    }
  }

  searchDriver() {
    this.selectedDriver = this.driverlist.find(driver => driver.rf_id === this.searchRfid) || this.firstDriver;
  }
}
