import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>edit-product works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductComponent { }
