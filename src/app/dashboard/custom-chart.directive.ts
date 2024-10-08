import { Directive, Input, OnChanges, SimpleChanges, ElementRef, OnDestroy } from '@angular/core';
import Highcharts from 'highcharts'; // Use the default import instead of `* as Highcharts`

@Directive({
  selector: '[appCustomChart]'
})
export class CustomChartDirective implements OnChanges, OnDestroy {
  @Input() chartOptions: any;

  private chart: Highcharts.Chart | null = null;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartOptions']) {
      if (this.chartOptions && Object.keys(this.chartOptions).length > 0) {
        this.init();
      }
    }
  }

  init() {
    try {
      // Destroy existing chart instance if it exists
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }

      // Ensure Highcharts is loaded properly
      console.log('Highcharts:', Highcharts);
      
      // Create a new chart instance
      this.chart = Highcharts.chart(this.el.nativeElement, this.chartOptions);
    } catch (error) {
      console.error('Error initializing Highcharts chart:', error);
    }
  }

  ngOnDestroy() {
    // Ensure the chart is destroyed to avoid memory leaks
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
