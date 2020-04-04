import { createAction, props } from '@ngrx/store';

export const addSuccessMessage = createAction("Add Success Message", props<{ message: string, action?: string }>());
export const addErrorMessage = createAction("Add Error Message", props<{ message: string, action?: string }>());
export const clearErrors = createAction("Clear Error Messages");
export const clearSuccesses = createAction("Clear Success Messages");
export const reset = createAction("Reset Validations");