import { environment } from '../../../environments/environment';
import { InjectionToken } from '@angular/core';
import { ActionReducerMap, MetaReducer, Action } from '@ngrx/store';
import { FavoritesState } from '@store/states/favorites.state';
import { LocationsState } from '@store/states/locations.state';
import { SearchesState } from '@store/states/searches.state';
import { favoritesReducer } from '@store/reducers/favorites.reducer';
import { locationsReducer } from '@store/reducers/locations.reducer';
import { searchesReducer } from '@store/reducers/searches.reducer';

export interface State {
    favorites: FavoritesState;
    locations: LocationsState;
    searches: SearchesState;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>
    ('Root reducer token', {
        factory: () => ({
            favorites: favoritesReducer,
            locations: locationsReducer,
            searches: searchesReducer
        }),
    });

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];