import { Injectable } from '@angular/core';
import { map, switchMap, catchError, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherService } from '@services/weather.service';
import { State } from '@store/index';
import * as searchesActions from '@store/actions/searches.actions';
import * as searchesSelectors from '@store/selectors/search.selectors';
import { SearchResults } from '@models/search-results.model';
import { addLocation } from '@store/actions/locations.actions';
import { Location } from '@models/location.model';

@Injectable()
export class SearchesEffects {
    constructor(private actions$: Actions, private weatherService: WeatherService, private store: Store<State>) { }

    search = createEffect(() => this.actions$.pipe(
        ofType(searchesActions.search),
        switchMap(action => 
            this.store.select(state => searchesSelectors.selectSearchResults(state, action.searchQuery) || action.searchQuery)
        ),
        switchMap(value => {
            if (typeof(value) === "string") {
                return this.weatherService.locationAutoComplete(value).pipe(
                    first(),
                    map(results => {
                        results.forEach(result => {
                            let location = new Location();
                            location.details = result;
                            this.store.dispatch(addLocation({ location }));
                        });
                        return ({ searchQuery: value, results } as SearchResults);
                    }),
                    catchError(err => {
                        console.log(err);
                        return of(undefined as SearchResults)
                    })
                );
            };
            return of(value);
        }),
        switchMap(result => {
            if (result) {
                return [searchesActions.searchSuccess({ result })];
            };
            return [searchesActions.searchFaild({ err: "server no responding, faild to search locations" })]
        }),
    ));
}