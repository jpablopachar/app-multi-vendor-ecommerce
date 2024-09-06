import { CategoryListResponse, CategoryPayload, CategoryRequest, CategoryResponse } from '@app/models'
import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const categoryActions = createActionGroup({
  source: 'Category',
  events: {
    messageClear: emptyProps(),
    categoryAdd: props<{ request: CategoryRequest }>(),
    categoryAddSuccess: props<{ response: CategoryResponse }>(),
    categoryAddError: props<{ error: string }>(),
    getCategories: props<{ payload: CategoryPayload }>(),
    getCategoriesSuccess: props<{ response: CategoryListResponse }>(),
  }
})