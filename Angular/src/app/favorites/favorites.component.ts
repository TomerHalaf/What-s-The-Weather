import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Favorite } from '@models/favorite.model';
// import { updateAllFavorites, removeFavorite } from '@wtw/shared/ngrx/actions/favorites.actions';
import { State } from '@store/index';
import { selectFavorites } from '@store/selectors/favorites.selectors';
import { addRemoveFavorite } from '@store/actions/favorites.actions';
import { selectLocation } from '@store/selectors/locations.selectors';

@Component({
    selector: 'wtw-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
    favorites$: Observable<Favorite[]>;
    getLocation = (locationKey: string) => {
        return this.store.pipe(selectLocation(locationKey));
    };

    constructor(private store:Store<State>, private router: Router) {
        this.favorites$ = this.store.select(selectFavorites);
    };

    removeFavorite(locationKey: string): void {
        let favorite: Favorite = { locationKey, description: "" };
        this.store.dispatch(addRemoveFavorite({ favorite }));
    };

    openInMain(favorite: Favorite): void {
        this.router.navigate(['home'], {
            state: { locationKey: favorite.locationKey }
        });
    };
}