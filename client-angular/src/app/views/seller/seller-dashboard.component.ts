import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { ApexChartTemplate } from '@app/models'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {
  faCentSign,
  faDollarSign,
  faShoppingCart,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, FontAwesomeModule, RouterLink],
  templateUrl: './seller-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellerDashboardComponent {
  public state: ApexChartTemplate = {
    series: [
      {
        name: 'Orders',
        data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78, 34, 45],
      },
      {
        name: 'Revenue',
        data: [67, 39, 45, 56, 90, 56, 23, 56, 87, 78, 67, 78],
      },
      {
        name: 'Sales',
        data: [34, 39, 56, 56, 80, 67, 23, 56, 98, 78, 45, 56],
      },
    ],
    options: {
      color: ['#008ffb', '#00e396', '#feb019'],
      plotOptions: {
        bar: {
          borderRadius: 30,
        },
      },
      chart: {
        type: 'bar',
        background: 'transparent',
        foreColor: '#d0d2d6',
        height: 350,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: ['smooth', 'straight', 'stepline'],
        lineCap: 'butt',
        colors: ['#f0f0f0'],
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apl',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      legend: {
        position: 'top',
      },
      responsive: [
        {
          breakpoint: 565,
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: '550px',
            },
            yaxis: {
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apl',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
            },
          },
        },
      ],
    },
  };

  public faDollarSign: IconDefinition = faDollarSign;
  public faCentSign: IconDefinition = faCentSign;
  public faShoppingCart: IconDefinition = faShoppingCart;

  public numbers = [1, 2, 3, 4, 5];
}
