import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-deactive-sellers',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>deactive-sellers works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeactiveSellersComponent { }
