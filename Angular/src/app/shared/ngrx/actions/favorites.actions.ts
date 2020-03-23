import { createAction, props } from '@ngrx/store';
import { Favorite } from '@models/favorite.model';

export const addRemoveFavorite = createAction('Add Favorite', props<{ favorite: Favorite }>());
export const updateFavorite = createAction('Update Favorite', props<{ favorite: Favorite }>());
export const clearFavorites = createAction("Clear Favorites");