 import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SmartWaste';
  baseUrl = "http://localhost:8080/admin/";
  whatToShow: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const { Modal } = await import('bootstrap');
    }
  }

  toggle(num: number) {
    this.whatToShow = num;
  }
}
