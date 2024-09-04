import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>products works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent { }
