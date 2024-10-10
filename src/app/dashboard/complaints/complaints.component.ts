import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
  driverComplaints: any = [];
  wastePickerComplaints: any = [];

  @Input() toggle1: any;

  constructor(private http: HttpClient, private app: AppComponent) {
  }
  ngOnInit(): void {
    if (this.toggle1 == 5) {
      this.loadComplaint();
    }
    else if (this.toggle1 == 6) {
      this.loadWastePickerComplaints();
    }
  }
  loadComplaint() {
    const url = `${this.app.baseUrl}getDriverComplaints`;
    this.http.get(url).subscribe((data: any) => {
      this.driverComplaints = data.map((complaint: any) => ({
        ...complaint,
        formattedTime: this.formatTime(complaint.time)
      }));
    });
  }
  loadWastePickerComplaints() {
    const url = `${this.app.baseUrl}getWastePickerComplaints`;
    this.http.get(url).subscribe((data: any) => {
      this.wastePickerComplaints = data.map((complaint: any) => ({
        ...complaint,
        formattedTime: this.formatTime(complaint.time)
      }));
    });
  }

  formatTime(timeString: string): string {
    const [datePart, timePart] = timeString.split(' ');
    const [day, month, year] = datePart.split('/');
    const formattedDate = `${year}-${month}-${day}T${timePart}+05:30`; // Adding IST offset
    return new Date(formattedDate).toLocaleString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  }
}
