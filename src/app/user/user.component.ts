import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';

interface Driver {
  rf_id: string;
  area: string;
  username: string;
  email: string;
  contact: string;
  address1: string;
  address2: string;
  pincode: string;
}
// src/global.d.ts
interface Window {
  bootstrap: any;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userlist: Driver[] = [];
  selectedUser: Driver | null = null;

  @ViewChild('userModal') userModal: any;  // Reference to the modal

  constructor(
    private http: HttpClient,
    private app: AppComponent
  ) { }

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    const url = `${this.app.baseUrl}getAllUsers`;
    this.http.get<Driver[]>(url).subscribe((data: Driver[]) => {
      this.userlist = data;
      console.log('Drivers loaded:', this.userlist);
    });
  }
}
