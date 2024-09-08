import { FormControl } from "@angular/forms"

export interface CategoryRequestForm {
  name: FormControl<string>;
  image: FormControl<string>;
}