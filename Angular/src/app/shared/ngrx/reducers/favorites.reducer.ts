import { createReducer, on } from '@ngrx/store';
import { FavoritesState } from '@store/states/favorites.state';
import * as favoritesActions from '@store/actions/favorites.actions';
import { HtmlApisHelper } from '@helpers/html-apis.helper';

const initialState: FavoritesState = {
    favorites: HtmlApisHelper.getLocalStorage("favorites") || []
};

export const favoritesReducer = createReducer(initialState,
    on(favoritesActions.addFavorite, (state, action) => {
        if(state.favorites.some(favorite => favorite.locationKey === action.favorite.locationKey)) return ({ ...state });
        let favorites = [ ...state.favorites, action.favorite ];
        HtmlApisHelper.setLocalStorage("favorites", favorites);
        return ({ ...state, favorites });
    }),
    on(favoritesActions.removeFavorite, (state, action) => {
        let favorites = state.favorites.filter(favorite => favorite.locationKey !== action.locationKey);
        HtmlApisHelper.setLocalStorage("favorites", favorites);
        return ({ ...state, favorites });
    }),
    on(favoritesActions.updateFavorite, (state, action) => {
        let favorites = state.favorites.map(favorite => favorite.locationKey === action.favorite.locationKey ? action.favorite : favorite);
        HtmlApisHelper.setLocalStorage("favorites", favorites);
        return ({ ...state, favorites });
    }),
    on(favoritesActions.clearFavorites, (state, action) => {
        HtmlApisHelper.setLocalStorage("favorites", []);
        return ({ ...state, favorites: [] });
    })
);