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
  driversList: any = []; // Initialize as an empty array
  routesList: any = [];   // Initialize as an empty array
  selectedDriver: any = null;
  selectedRoute: any = null;

  constructor(
    private http: HttpClient,
    private app: AppComponent,
    private driverService: DriverService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
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
      console.log(this.driversList);
      this.driverService.setDrivers(data);
      console.log('Drivers loaded:', this.driversList);
    });
  }

  openModal(driver: any) {
    this.selectedDriver = driver;
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('driverModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement); // Use bootstrap variable directly
        modal.show(); // Show the modal
      }
    }
  }

  loadRoutes() {
    const url = `${this.app.baseUrl}getAllRoutes`;
    this.http.get(url).subscribe((data: any) => {
      this.routesList = data;
      console.log("Routes loaded:", this.routesList);
    });
  }

  selectRoute(route: any) {
    this.selectedRoute = route;
  }

  assignRoute() {
    const url = `${this.app.baseUrl}assignRoute/${this.selectedDriver.id}`;
    this.http.put(url, { routeId: this.selectedRoute.routeId }).subscribe((data: any) => {
      console.log("Route assigned:", data);
      this.loadRoutes(); // Optionally reload routes after assignment
    });
  }
}
