import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>profile works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent { }
