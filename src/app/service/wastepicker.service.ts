import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WastePickerService {
  private wastePickersList: any[] = []; // Cache for waste pickers

  constructor(private http: HttpClient) { }

  // Method to load waste pickers if not already loaded
  getWastePickers(url: string): Observable<any> {
    if (this.wastePickersList.length === 0) {
      return this.http.get<any[]>(url);
    } else {
      return new Observable(observer => {
        observer.next(this.wastePickersList);  // Return cached data as observable
        observer.complete();
      });
    }
  }

  // Set the waste pickers list after fetching from the server
  setWastePickers(wastePickers: any[]) {
    this.wastePickersList = wastePickers;
  }

  // Get the cached waste pickers list
  getCachedWastePickers() {
    return this.wastePickersList;
  }
}
