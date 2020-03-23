import { State } from '@store/index'
import { createSelector } from '@ngrx/store'
import { SearchResults } from '@models/search-results.model';

export const selectSearches = (state: State) => state.searches.searches;
export const selectedResult = (state: State) => state.searches.selectedResult;

export const selectSearchResults = createSelector(
    selectSearches,
    (searches: SearchResults[], search: string) => searches.find(results => results.searchQuery === search)
);

export const selectResult = createSelector(
    selectSearches,
    (searches: SearchResults[], search: string) => searches.find(results => results.results.some(result => 
        result.Key === search || result.LocalizedName === search
    ))
);