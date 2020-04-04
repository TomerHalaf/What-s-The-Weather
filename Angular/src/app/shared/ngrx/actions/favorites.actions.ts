import { createAction, props } from '@ngrx/store';
import { Favorite } from '@models/favorite.model';

export const addFavorite = createAction('Add Favorite', props<{ favorite: Favorite }>());
export const removeFavorite = createAction('Remove Favorite', props<{ locationKey: string }>());
export const updateFavorite = createAction('Update Favorite', props<{ favorite: Favorite }>());
export const clearFavorites = createAction("Clear Favorites");