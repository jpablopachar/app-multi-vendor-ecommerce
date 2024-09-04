import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>AdminLogin works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLoginComponent { }
