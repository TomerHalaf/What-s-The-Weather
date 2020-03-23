import { State } from '@store/index'
import { createSelector } from '@ngrx/store'
import { Favorite } from '@models/favorite.model';

export const selectFavorites = (state: State) => state.favorites.favorites;

export const isFavorite = createSelector(
    selectFavorites,
    (favorites: Favorite[], locationKey: string) => favorites.some(favorite => favorite.locationKey === locationKey)
);