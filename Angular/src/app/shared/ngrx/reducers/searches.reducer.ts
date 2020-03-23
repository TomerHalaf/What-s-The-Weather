import { SearchesState } from "@store/states/searches.state";
import { HtmlApisHelper } from '@helpers/html-apis.helper';
import { createReducer, on } from '@ngrx/store';
import * as searchActions from '@store/actions/searches.actions';

const initialState: SearchesState = {
    searches: HtmlApisHelper.getLocalStorage("searches") || [],
    selectedResult: undefined,
    error: null
};

export const searchesReducer = createReducer(initialState,
    on(searchActions.searchSuccess, (state, action) => {
        let searches = state.searches.filter(search => search.searchQuery !== action.result.searchQuery);
        searches.push(action.result);
        searches.sort((a , b) => a.searchQuery.localeCompare(b.searchQuery));
        HtmlApisHelper.setLocalStorage("searches", searches);
        return ({ ...state, searches, error: null });
    }),
    on(searchActions.searchFaild, (state, action) => ({ ...state, error: action.err })),
    on(searchActions.setSelectedResult, (state, action) => ({ ...state, selectedResult: action.result })),
    on(searchActions.clearSelectedResult, (state, action) => ({ ...state, selectedResult: undefined })),
    on(searchActions.clearError, (state, action) => ({ ...state, error: null }))
);