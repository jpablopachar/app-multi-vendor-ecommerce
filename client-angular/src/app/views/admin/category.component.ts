import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>category works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent { }
