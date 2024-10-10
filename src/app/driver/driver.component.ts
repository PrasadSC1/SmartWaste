import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { DriverService } from '../service/driver.service';
import { isPlatformBrowser } from '@angular/common';

declare var bootstrap: any; // Declare bootstrap for global usage

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  driversList: any = [];
  routesList: any = [];
  selectedDriver: any = null;
  selectedRoute: any = null;

  constructor(
    private http: HttpClient,
    private app: AppComponent,
    private driverService: DriverService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadRoutes();
  }

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers() {
    const url = `${this.app.baseUrl}getAllDrivers`;
    this.driverService.getDrivers(url).subscribe((data: any) => {
      this.driversList = data;
      this.driverService.setDrivers(data);
    });
  }

  openModal(driver: any) {
    this.selectedDriver = driver;
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('driverModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
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

  assignRoute() {
    const url = `${this.app.baseUrl}assignRoute/${this.selectedDriver.id}`;
    this.http.put(url, this.selectedRoute.routeId).subscribe((data: any) => {
      this.selectedDriver.assignedRoute = `${this.selectedRoute.startingPoint} to ${this.selectedRoute.endingPoint}`;
      const driverIndex = this.driversList.findIndex((driver: { id: any; }) => driver.id === this.selectedDriver.id);
      if (driverIndex !== -1) {
        this.driversList[driverIndex] = { ...this.driversList[driverIndex], assignedRoute: this.selectedDriver.assignedRoute };
      }
    });
  }

}
