import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="flex justify-between items-center">
    <select
      class="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
      (change)="onOptionChange($event)"
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
    <input
      class="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
      type="text"
      placeholder="search"
      (input)="onInput($event)"
    />
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Output() setParPage = new EventEmitter<number>();
  @Output() setSearchValue = new EventEmitter<string>();

  public onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    this.setSearchValue.emit(inputElement.value);
  }

  public onOptionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;

    this.setParPage.emit(Number(selectElement.value));
  }
}
