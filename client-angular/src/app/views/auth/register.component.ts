import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>register works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent { }
