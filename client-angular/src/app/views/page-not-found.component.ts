import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>page-not-found works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent { }
