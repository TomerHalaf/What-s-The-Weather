import { Injectable } from '@angular/core';
import { map, switchMap, catchError, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherService } from '@services/weather.service';
import { State } from '@store/index';
import * as searchesActions from '@store/actions/searches.actions';
import * as validationsActions from '@store/actions/validations.actions';
import * as searchesSelectors from '@store/selectors/search.selectors';
import { SearchResults } from '@models/search-results.model';
import { addLocation } from '@store/actions/locations.actions';
import { Location } from '@models/location.model';

@Injectable()
export class SearchesEffects {
    constructor(private actions$: Actions, private weatherService: WeatherService, private store: Store<State>) { }

    search = createEffect(() => this.actions$.pipe(
        ofType(searchesActions.search),
        map(action => action.searchQuery),
        switchMap(searchQuery => this.store.pipe(
            select(state => searchesSelectors.selectSearchResults(state, searchQuery)),
            switchMap(results => {
                if (results) return of(results);
                if (searchQuery && searchQuery.length === 0) return of(null);
                if (!results && !searchQuery) return of(null);
                return this.weatherService.locationAutoComplete(searchQuery).pipe(
                    first(),
                    map(results => {
                        results.forEach(details => {
                            let location: Location = { details, currentConditions: undefined, dailyForcasts: undefined };
                            this.store.dispatch(addLocation({ location }));
                        });
                        return ({ searchQuery, results } as SearchResults);
                    }),
                    catchError(err => {
                        console.log(err);
                        return of(undefined as SearchResults)
                    })
                );
            })
        )),
        switchMap(results => {
            if (results) {
                return [searchesActions.searchSuccess({ results })];
            };
            return [validationsActions.addErrorMessage({ message: "server is not responding, faild to search locations" })];
        }),
    ));
}