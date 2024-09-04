import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-deactive',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>deactive works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeactiveComponent { }
