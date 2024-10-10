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
  wastePickersList: any[] = [];
  selectedWastePicker: any = null;
  areaList: any[] = [];
  selectedArea: any = null;
  constructor(
    private http: HttpClient,
    private app: AppComponent,
    private wastePickerService: WastePickerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.loadWastePickers();
    this.loadAreas();
  }
  loadWastePickers(): void {
    const url = `${this.app.baseUrl}getAllWastePickers`;
    this.wastePickerService.getWastePickers(url).subscribe((data) => {
      this.wastePickersList = data;
      this.wastePickerService.setWastePickers(data);
    });
  }
  async openModal(wastePicker: any): Promise<void> {
    this.selectedWastePicker = wastePicker;
    if (isPlatformBrowser(this.platformId)) {
      const { Modal } = await import('bootstrap');
      const modalElement = document.getElementById('wastePickerModal');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      }
    }
  }
  loadAreas(): void {
    const url = `${this.app.baseUrl}getAllAreas`;
    this.http.get(url).subscribe((data: any) => {
      this.areaList = data;
    });
  }
  selectArea(area: any): void {
    this.selectedArea = area;
  }
  assignArea(): void {
    if (this.selectedArea?.area && this.selectedWastePicker) {
      const url = `${this.app.baseUrl}assignArea/${this.selectedWastePicker.uid}`;
      this.http.put(url, this.selectedArea.area).subscribe((data: any) => {
        if (data == 1) {
          this.selectedWastePicker.area = this.selectedArea.area;
        }
      });
    }
  }
}
