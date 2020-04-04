import { SearchesState } from "@store/states/searches.state";
import { HtmlApisHelper } from '@helpers/html-apis.helper';
import { createReducer, on } from '@ngrx/store';
import * as searchActions from '@store/actions/searches.actions';

const initialState: SearchesState = {
    searches: HtmlApisHelper.getLocalStorage("searches") || [],
    currentSearchQuery: undefined
};

export const searchesReducer = createReducer(initialState,
    on(searchActions.searchSuccess, (state, action) => {
        let searches = state.searches.filter(search => search.searchQuery !== action.results.searchQuery);
        searches.push(action.results);
        searches.sort((a , b) => a.searchQuery.localeCompare(b.searchQuery));
        HtmlApisHelper.setLocalStorage("searches", searches);
        return ({ ...state, searches });
    }),
    on(searchActions.setCurrentSearchQuery, (state, action) => ({ ...state, currentSearchQuery: action.searchQuery })),
    on(searchActions.clearCurrentSearchQuery, (state, action) => ({ ...state, currentSearchQuery: undefined }))
);