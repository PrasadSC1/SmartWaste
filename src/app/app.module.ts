import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts'; // Only import angular-highcharts module
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriverComponent } from './driver/driver.component';
import { UserComponent } from './user/user.component';
import { WastepickerComponent } from './wastepicker/wastepicker.component';
import { NewrouteComponent } from './newroute/newroute.component';
import { ComplaintsComponent } from './dashboard/complaints/complaints.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DriverComponent,
    UserComponent,
    WastepickerComponent,
    NewrouteComponent,
    ComplaintsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule // Use the correct module for the selected library
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
