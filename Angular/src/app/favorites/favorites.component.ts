import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Favorite } from '@models/favorite.model';
import { State } from '@store/index';
import { selectFavorites } from '@store/selectors/favorites.selectors';
import { selectLocation } from '@store/selectors/locations.selectors';
import { setSelectedLocationKey, updateLocationCurrentConditions } from '@store/actions/locations.actions';
import { removeFavorite } from '@store/actions/favorites.actions';

@Component({
    selector: 'wtw-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
    favorites$: Observable<Favorite[]> = this.store.select(state => {
        let favorites = selectFavorites(state);
        favorites.forEach(favorite => this.store.dispatch(updateLocationCurrentConditions({ locationKey: favorite.locationKey })));
        return favorites;
    });
    getLocation = (locationKey: string) => this.store.select(state => selectLocation(state, locationKey));

    constructor(private store: Store<State>, private router: Router) { };

    removeFavorite(locationKey: string): void {
        this.store.dispatch(removeFavorite({ locationKey }));
    };

    openInMain(locationKey: string): void {
        this.store.dispatch(setSelectedLocationKey({ locationKey }));
        this.router.navigate(['home']);
    };
}