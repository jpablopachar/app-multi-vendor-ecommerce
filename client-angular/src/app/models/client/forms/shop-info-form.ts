import { FormControl } from "@angular/forms"

export interface ShopInfoRequestForm {
  division: FormControl<string>;
  district: FormControl<string>;
  shopName: FormControl<string>;
  sub_district: FormControl<string>;
}