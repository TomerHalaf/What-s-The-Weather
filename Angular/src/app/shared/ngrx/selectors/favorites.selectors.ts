import { State } from '@store/index'
import { selectSelectedLocationKey } from './locations.selectors';
import { Favorite } from '@models/favorite.model';

export function selectFavorites(state: State): Favorite[] {
    return state.favorites.favorites;
};

export function isFavorite(state: State, locationKey?: string): boolean{
    let favorites = selectFavorites(state);
    let key = locationKey ? locationKey : selectSelectedLocationKey(state);
    return favorites.some(favorite => favorite.locationKey === key);
};