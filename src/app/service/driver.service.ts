
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private driversList: any[] = [];  // Cache the drivers list

  constructor(private http: HttpClient) { }

  // Method to load drivers if not already loaded
  getDrivers(url: string): Observable<any> {
    
    if (this.driversList.length === 0) {
      return this.http.get(url);
    } else {
      return new Observable(observer => {
        observer.next(this.driversList);  // Return cached data as observable
        observer.complete();
      });
    }
  }

  // Set the drivers list after fetching from the server
  setDrivers(drivers: any[]) {
    this.driversList = drivers;
  }

  // Get the cached drivers list
  // getCachedDrivers() {
  //   return this.driversList;
  // }
}
