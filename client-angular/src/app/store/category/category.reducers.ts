import { createFeature, createReducer, on } from '@ngrx/store'
import { categoryActions } from './category.actions'
import { CategoryState } from './category.state'

const categoryInitialState: CategoryState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  categories: [],
  total: 0,
};

const categoryFeature = createFeature({
  name: 'category',
  reducer: createReducer(
    categoryInitialState,
    on(categoryActions.messageClear, (state: CategoryState) => ({
      ...state,
      errorMessage: '',
    })),
    on(categoryActions.categoryAdd, (state: CategoryState) => ({
      ...state,
      loader: true,
    })),
    on(categoryActions.categoryAddSuccess, (state: CategoryState, action) => ({
      ...state,
      loader: false,
      successMessage: action.response.message,
      categories: [...state.categories, action.response.category],
    })),
    on(categoryActions.categoryAddError, (state: CategoryState, action) => ({
      ...state,
      loader: false,
      errorMessage: action.error,
    })),
    on(categoryActions.getCategories, (state: CategoryState) => ({
      ...state,
    })),
    on(
      categoryActions.getCategoriesSuccess,
      (state: CategoryState, action) => ({
        ...state,
        categories: action.response.categories,
        total: action.response.total,
      })
    )
  ),
});

export const {
  name: categoryFeatureKey,
  reducer: categoryReducer,
  selectLoader,
  selectSuccessMessage,
  selectErrorMessage,
  selectCategories,
} = categoryFeature;
