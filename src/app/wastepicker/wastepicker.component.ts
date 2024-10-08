import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { WastePickerService } from '../service/wastepicker.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-wastepicker',
  templateUrl: './wastepicker.component.html',
  styleUrls: ['./wastepicker.component.css']
})
export class WastepickerComponent implements OnInit {
  wastePickersList: any[] = []; // List of waste pickers fetched from API
  selectedWastePicker: any = null; // Store the selected waste picker details
  areaList: any[] = []; // Store list of all areas fetched from API
  selectedArea: any = null; // Store selected area

  constructor(
    private http: HttpClient,
    private app: AppComponent,
    private wastePickerService: WastePickerService,
    @Inject(PLATFORM_ID) private platformId: Object // Check platform to prevent server-side errors
  ) { }

  ngOnInit(): void {
    this.loadWastePickers();
    this.loadAreas();
  }

  // Load waste pickers data
  loadWastePickers(): void {
    const url = `${this.app.baseUrl}getAllWastePickers`;
    this.wastePickerService.getWastePickers(url).subscribe((data) => {
      this.wastePickersList = data;
      this.wastePickerService.setWastePickers(data); // Cache the data in the service
    });
  }

  // Open the modal with selected waste picker details
  async openModal(wastePicker: any): Promise<void> {
    this.selectedWastePicker = wastePicker;
    console.log(this.selectedWastePicker);

    // Check if running in the browser environment
    if (isPlatformBrowser(this.platformId)) {
      const { Modal } = await import('bootstrap'); // Dynamic import of Bootstrap Modal
      const modalElement = document.getElementById('wastePickerModal');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show(); // Show the modal
      }
    }
  }

  // Load all areas from API
  loadAreas(): void {
    const url = `${this.app.baseUrl}getAllAreas`;
    this.http.get(url).subscribe((data: any) => {
      this.areaList = data;
    });
  }

  // Set selected area from dropdown
  selectArea(area: any): void {
    this.selectedArea = area;
  }

  // Assign selected area to the selected waste picker
  assignArea(): void {
    if (this.selectedArea?.area && this.selectedWastePicker) {
      const url = `${this.app.baseUrl}assignArea/${this.selectedWastePicker.uid}`;
      this.http.put(url, this.selectedArea.area).subscribe((data: any) => {
        if (data == 1) {
          this.selectedWastePicker.area = this.selectedArea.area; // Update UI with the new area
        }
      });
    }
  }
}
