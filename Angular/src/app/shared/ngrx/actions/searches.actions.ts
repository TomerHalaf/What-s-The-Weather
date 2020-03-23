import { createAction, props } from '@ngrx/store';
import { SearchResults } from '@models/search-results.model';
import { AutocompleteResponse } from '@models/accuweather-api/autocomplete-response.model';

export const search = createAction("Search", props<{ searchQuery: string }>());
export const searchSuccess = createAction("Search Success", props<{ result: SearchResults }>());
export const searchFaild = createAction("Search Faild", props<{ err: string }>());
export const setSelectedResult = createAction("Set Selected Result", props<{ result: AutocompleteResponse }>());
export const clearSelectedResult = createAction("Clear Selected Result");
export const clearError = createAction("Clear Error");