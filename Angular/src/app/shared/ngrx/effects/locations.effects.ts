import { Injectable } from '@angular/core';
import { map, switchMap, catchError, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherService } from '@services/weather.service';
import { State } from '@store/index';
import * as locationsActions from '@store/actions/locations.actions';
import { Location } from '@models/location.model';

@Injectable()
export class LocationsEffects {
    constructor(private actions$: Actions, private weatherService: WeatherService, private store: Store<State>) { }

    updateLocationCurrentConditions = createEffect(() => this.actions$.pipe(
        ofType(locationsActions.updateLocationCurrentConditions),
        switchMap(action => this.store.select(state =>
            state.locations.locations).pipe(
                first(),
                map(locations => locations.find(location => location.details.Key === action.locationKey))
            )),
        switchMap(location => {
            if (location) {
                return this.weatherService.getLocationCurrentConditions(location.details.Key).pipe(
                    first(),
                    map(currentConditions => ({ ...location, currentConditions: currentConditions[0] || undefined } as Location)),
                    catchError(err => {
                        console.log(err);
                        return of(undefined as Location)
                    })
                );
            };
            return of(undefined as Location);
        }),
        switchMap(location => {
            if (location) {
                let locationKey = location.details.Key;
                let currentConditions = location.currentConditions;
                return [locationsActions.updateLocationCurrentConditionsSuccess({ locationKey, currentConditions })];
            };
            return [locationsActions.updateLocationFaild({ err: "server no responding, faild to update location data" })]
        }),
    ));

    updateLocationDailyForcasts = createEffect(() => this.actions$.pipe(
        ofType(locationsActions.updateLocationDailyForcasts),
        switchMap(action => this.store.select(state =>
            state.locations.locations).pipe(
                first(),
                map(locations => locations.find(location => location.details.Key === action.locationKey))
            )),
        switchMap(location => {
            if (location) {
                return this.weatherService.getLocation5DaysOfDailyForecasts(location.details.Key).pipe(
                    first(),
                    map(dailyForcasts => ({ ...location, dailyForcasts } as Location)),
                    catchError(err => {
                        console.log(err);
                        return of(undefined as Location)
                    })
                );
            };
            return of(undefined as Location);
        }),
        switchMap(location => {
            if (location) {
                let locationKey = location.details.Key;
                let dailyForcasts = location.dailyForcasts;
                return [locationsActions.updateLocationDailyForcastsSuccess({ locationKey, dailyForcasts })];
            };
            return [locationsActions.updateLocationFaild({ err: "server no responding, faild to update location data" })]
        }),
    ));
}