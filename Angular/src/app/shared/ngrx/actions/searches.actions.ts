import { createAction, props } from '@ngrx/store';
import { SearchResults } from '@models/search-results.model';

export const search = createAction("Search", props<{ searchQuery?: string }>());
export const searchSuccess = createAction("Search Success", props<{ results: SearchResults }>());
export const setCurrentSearchQuery = createAction("Set Current Search Query", props<{ searchQuery: string }>());
export const clearCurrentSearchQuery = createAction("Clear Current Search Query", props<{ query: string }>());