import { FormControl } from "@angular/forms"

export interface ProductRequestForm {
  name: FormControl<string>;
  brand: FormControl<string>;
  category: FormControl<string>;
  stock: FormControl<string>;
  price: FormControl<string>;
  discount: FormControl<string>;
  description: FormControl<string>;
}