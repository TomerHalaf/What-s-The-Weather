import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '@store/index';
import * as searchSelectors from '@store/selectors/search.selectors';
import * as locationsSelectors from '@store/selectors/locations.selectors';
import * as favoritesSelectors from '@store/selectors/favorites.selectors';
import * as searchActions from '@store/actions/searches.actions'
import * as locationsActions from '@store/actions/locations.actions'
import * as favoritesActions from '@store/actions/favorites.actions'
import { AutocompleteResponse } from '@models/accuweather-api/autocomplete-response.model';
import { Observable } from 'rxjs';
import { Favorite } from '@models/favorite.model';
import { Location } from '@models/location.model';

@Component({
    selector: 'wtw-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
    isFavorite$ = this.store.select(favoritesSelectors.isFavorite);
    searchResults$ = this.store.select(searchSelectors.selectSearchResults);
    location$: Observable<Location> = this.store.select(locationsSelectors.selectLocation);

    constructor(private store: Store<State>) { };

    selectLocation(location: AutocompleteResponse): void {
        this.store.dispatch(locationsActions.setSelectedLocationKey({ locationKey: location.Key }));
        this.store.dispatch(locationsActions.updateLocationCurrentConditions({ locationKey: location.Key }));
        this.store.dispatch(locationsActions.updateLocationDailyForcasts({ locationKey: location.Key }));
        this.search(location.LocalizedName);
    };

    search(searchQuery: string): void {
        this.store.dispatch(searchActions.setCurrentSearchQuery({ searchQuery }));
        this.store.dispatch(searchActions.search({ searchQuery }));
    };

    addFavorite(location: AutocompleteResponse): void {
        let favorite: Favorite = { locationKey: location.Key, description: location.LocalizedName };
        this.store.dispatch(favoritesActions.addFavorite({ favorite }));
    };

    removeFavorite(locationKey: string): void {
        this.store.dispatch(favoritesActions.removeFavorite({ locationKey }));
    };
}