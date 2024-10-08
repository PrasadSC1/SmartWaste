import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DriverComponent } from './driver/driver.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { WastepickerComponent } from './wastepicker/wastepicker.component';
import { HttpClientModule } from '@angular/common/http';
import { NewrouteComponent } from './newroute/newroute.component';
import { ComplaintsComponent } from './dashboard/complaints/complaints.component';
// import { ChartModule } from 'angular-highcharts';
@NgModule({
  declarations: [
    AppComponent,
    DriverComponent,
    DashboardComponent,
    UserComponent,
    WastepickerComponent,
    NewrouteComponent,
    ComplaintsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    // ChartModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
