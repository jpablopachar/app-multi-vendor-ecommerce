import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SearchComponent } from '@app/components/search.component'

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent { }
