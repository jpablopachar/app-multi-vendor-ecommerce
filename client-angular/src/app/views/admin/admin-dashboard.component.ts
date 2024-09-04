import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>adminDashboard works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent { }
