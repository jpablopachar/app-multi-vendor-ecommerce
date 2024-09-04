import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>add-product works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductComponent { }
