import { State } from '@store/index'
import { SearchResults } from '@models/search-results.model';

export function selectSearches(state: State): SearchResults[] {
    return state.searches.searches;
};

export function selectCurrentSearchQuery(state: State): string {
    return state.searches.currentSearchQuery;
};

export function selectSearchResults(state: State, searchQuery?: string): SearchResults {
    let searches = state.searches.searches;
    let query = chooseQuery(searchQuery, state.searches.currentSearchQuery);
    let searchResults = searches.find(results => results.searchQuery === query);
    return searchResults;
};

function chooseQuery(q1: string, q2: string): string {
    if (q1) {
        return q1.length === 0 ? null : q1;
    } else if (q2) {
        return q2.length === 0 ? null: q2;
    };
    return null;
};