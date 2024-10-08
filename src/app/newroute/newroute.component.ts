import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';

export interface Stop {
  area: string;
  address: string;
  lat: string;
  lon: string;
  dry: number;
  wet: number;
}

export interface Route {
  routeId: string;
  startingPoint: string;
  endingPoint: string;
  stops: Stop[];
}

export interface RouteResponse {
  success: boolean;
  message: string;
  data?: Route;
}

@Component({
  selector: 'app-newroute',
  templateUrl: './newroute.component.html',
  styleUrls: ['./newroute.component.css']
})
export class NewrouteComponent implements OnInit {
  routeForm: FormGroup;
  isLoading = false;
  submissionMessage = '';
  stopsList: Stop[] = [];
  routesList: Route[] = [];
  selectedRouteId: string | null = null;
  editingRouteId: string | null = null;
  editmode: boolean = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private app: AppComponent
  ) {
    this.routeForm = this.fb.group({
      startingPoint: ['', Validators.required],
      endingPoint: ['', Validators.required],
      stops: this.fb.array([])
    });

    this.allStops();
    this.allRoutes();
  }

  ngOnInit(): void { }

  submitRoute() {
    if (this.routeForm.invalid) {
      this.submissionMessage = 'Please fill all required fields correctly.';
      return;
    }

    this.isLoading = true;
    const url = this.editingRouteId
      ? `${this.app.baseUrl}updateRoute/${this.editingRouteId}`
      : `${this.app.baseUrl}setNewRoute`;

    this.http.post<RouteResponse>(url, this.routeForm.value).subscribe(
      (data) => {
        this.isLoading = false;
        this.submissionMessage = this.editingRouteId
          ? 'Route successfully updated'
          : 'Route successfully set';

        this.routeForm.reset();
        this.stops.clear();
        this.editingRouteId = null;
        this.selectedRouteId = null;
        this.editmode = false; // Reset edit mode after submission
        this.allRoutes();
      },
      (error) => {
        this.isLoading = false;
        this.submissionMessage = 'Error setting/updating route. Please try again.';
        console.error('Error:', error);
      }
    );
  }

  allStops() {
    const url = `${this.app.baseUrl}getAllAreas`;
    this.http.get<Stop[]>(url).subscribe((data: Stop[]) => {
      this.stopsList = data;
    });
  }

  allRoutes() {
    const url = `${this.app.baseUrl}getAllRoutes`;
    this.http.get<Route[]>(url).subscribe((data: Route[]) => {
      this.routesList = data;
    });
  }

  get stops(): FormArray {
    return this.routeForm.get('stops') as FormArray;
  }

  addStop() {
    const stopGroup = this.fb.group({
      area: ['', Validators.required],
      address: [''],
      lat: [''],
      lon: [''],
      dry: [0],
      wet: [0]
    });
    this.stops.push(stopGroup);
  }
  removeLastStop() {
    if (this.stops.length > 0) {
      this.stops.removeAt(this.stops.length - 1);
    }
  }


  onStopSelect(event: Event, index: number) {
    const selectedStop = (event.target as HTMLSelectElement)?.value;
    const stopObject = this.stopsList.find(stop => stop.area === selectedStop);

    if (stopObject) {
      const stopGroup = this.stops.at(index) as FormGroup;
      stopGroup.patchValue(stopObject);
    }
  }

  isStopDisabled(stopArea: string): boolean {
    return this.stops.controls.some(control => control.get('area')?.value === stopArea);
  }

  loadRouteForEdit() {
    if (!this.selectedRouteId) {
      return;
    }

    const selectedRoute = this.routesList.find(route => route.routeId === this.selectedRouteId);

    if (selectedRoute) {
      this.editingRouteId = selectedRoute.routeId;

      this.routeForm.patchValue({
        startingPoint: selectedRoute.startingPoint,
        endingPoint: selectedRoute.endingPoint
      });

      this.stops.clear();

      selectedRoute.stops.forEach(stop => {
        const stopGroup = this.fb.group({
          area: [stop.area, Validators.required],
          address: [stop.address],
          lat: [stop.lat],
          lon: [stop.lon],
          dry: [stop.dry],
          wet: [stop.wet]
        });
        this.stops.push(stopGroup);
      });
    }
  }
  cancelEdit() {
    this.editmode = false;  // Exit edit mode
    this.routeForm.reset();  // Reset the form fields
    this.stops.clear();      // Clear the stops FormArray
    this.editingRouteId = null; // Clear the editing route ID
    this.selectedRouteId = null; // Clear the selected route ID
  }

}
