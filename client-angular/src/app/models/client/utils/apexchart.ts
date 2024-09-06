import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexStroke, ApexXAxis } from "ng-apexcharts"

interface ApexChartOptions {
  color: string[];
  plotOptions: ApexPlotOptions;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  legend: ApexLegend;
  responsive: ApexResponsive[];
}

export interface ApexChartTemplate {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  options: ApexChartOptions;
}