import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    searchQuery: string;
    isFavorite$ = this.store.select(state => favoritesSelectors.isFavorite(state, state.locations.selectedLocationKey));
    searchResults$ = this.store.select(state => searchSelectors.selectSearchResults(state, this.searchQuery));
    location$: Observable<Location>;

    constructor(private router: Router, private store: Store<State>) {
        this.location$ = this.store.pipe(locationsSelectors.selectLocation());
        if (this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.locationDetails) {
            let locationDetails = this.router.getCurrentNavigation().extras.state.locationDetails.LocalizedName;
            this.searchQuery = locationDetails.LocalizedName;
            this.selectResult(locationDetails);
        };
    };

    selectResult(result: AutocompleteResponse): void {
        if (result) {
            this.store.dispatch(locationsActions.setSelectLocation({ locationKey: result.Key }));
            this.store.dispatch(locationsActions.updateLocationCurrentConditions({ locationKey: result.Key }));
            this.store.dispatch(locationsActions.updateLocationDailyForcasts({ locationKey: result.Key }));
        };
    };

    search(searchQuery: string): void {
        this.searchQuery = searchQuery;
        this.store.dispatch(searchActions.search({ searchQuery }));
    };

    addRemoveFavorite(location: AutocompleteResponse): void {
        let favorite: Favorite = { locationKey: location.Key, description: location.LocalizedName };
        this.store.dispatch(favoritesActions.addRemoveFavorite({ favorite }));
    };
}