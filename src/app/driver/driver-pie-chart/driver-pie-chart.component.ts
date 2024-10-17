import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { AppComponent } from '../../app.component';
import { isPlatformBrowser } from '@angular/common';

declare var bootstrap: any; // For Bootstrap modal handling

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
  routesList: any;
  selectedRoute: any;

  constructor(private http: HttpClient, private app: AppComponent, @Inject(PLATFORM_ID) private platformId: Object) {
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
          events: {
            click: (event: any) => {
              const driverIndex = event.point.index;
              const driver = this.driverlist[driverIndex];
              this.onDriverSelected(driver);
            }
          }
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

  onDriverSelected(driver: Driver) {
    this.selectedDriver = driver;
  
    // Ensure the modal is opened after DOM is rendered
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const modalElement = document.getElementById('selectedDriverModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      }, 0); // This ensures the DOM is fully updated
    }
  }

  loadRoutes() {
    const url = `${this.app.baseUrl}getAllRoutes`;
    this.http.get(url).subscribe((data: any) => {
      this.routesList = data;

    });
  }

  selectRoute(route: any) {
    this.selectedRoute = route;
  }

  // assignRoute() {
  //   const url = `${this.app.baseUrl}assignRoute/${this.selectedDriver.id}`;
  //   this.http.put(url, this.selectedRoute.routeId).subscribe((data: any) => {
  //     this.selectedDriver.assignedRoute = `${this.selectedRoute.startingPoint} to ${this.selectedRoute.endingPoint}`;
  //     const driverIndex = this.driversList.findIndex((driver: { id: any; }) => driver.id === this.selectedDriver.id);
  //     if (driverIndex !== -1) {
  //       this.driversList[driverIndex] = { ...this.driversList[driverIndex], assignedRoute: this.selectedDriver.assignedRoute };
  //     }
  //   });
  // }

}
