import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriverComponent } from './driver/driver.component';
import { UserComponent } from './user/user.component';
import { WastepickerComponent } from './wastepicker/wastepicker.component';
import { NewrouteComponent } from './newroute/newroute.component';
import { ComplaintsComponent } from './dashboard/complaints/complaints.component';
import { UserPieChartComponent } from './user/user-pie-chart/user-pie-chart.component';
import { DriverPieChartComponent } from './driver/driver-pie-chart/driver-pie-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DriverComponent,
    UserComponent,
    WastepickerComponent,
    NewrouteComponent,
    ComplaintsComponent,
    UserPieChartComponent,
    DriverPieChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
