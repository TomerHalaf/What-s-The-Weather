import { Injectable } from '@angular/core';
import { map, switchMap, catchError, first } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherService } from '@services/weather.service';
import { State } from '@store/index';
import * as locationsActions from '@store/actions/locations.actions';
import * as validationsActions from '@store/actions/validations.actions';
import { Location } from '@models/location.model';

@Injectable()
export class LocationsEffects {
    constructor(private actions$: Actions, private weatherService: WeatherService, private store: Store<State>) { }

    updateLocationCurrentConditions = createEffect(() => this.actions$.pipe(
        ofType(locationsActions.updateLocationCurrentConditions),
        switchMap(action => this.getLocation(action.locationKey)),
        switchMap(location => {
            if (location) {
                if (this.needUpdate("Current Conditions", location)) {
                    return this.weatherService.getLocationCurrentConditions(location.details.Key).pipe(
                        first(),
                        map(currentConditions => ({ ...location, currentConditions: currentConditions[0] || undefined } as Location)),
                        catchError(err => {
                            console.log(err);
                            return of(undefined as Location)
                        })
                    );
                };
                return of(location);
            };
            return of(undefined as Location);
        }),
        switchMap(location => {
            if (location) {
                let locationKey = location.details.Key;
                let currentConditions = location.currentConditions;
                return [locationsActions.updateLocationCurrentConditionsSuccess({ locationKey, currentConditions })];
            };
            return [validationsActions.addErrorMessage({ message: "server no responding, faild to update current conditions" })];
        }),
    ));

    updateLocationDailyForcasts = createEffect(() => this.actions$.pipe(
        ofType(locationsActions.updateLocationDailyForcasts),
        switchMap(action => this.getLocation(action.locationKey)),
        switchMap(location => {
            if (location) {
                if (this.needUpdate("Daily Forcasts", location)) {
                    return this.weatherService.getLocation5DaysOfDailyForecasts(location.details.Key).pipe(
                        first(),
                        map(dailyForcasts => ({ ...location, dailyForcasts } as Location)),
                        catchError(err => {
                            console.log(err);
                            return of(undefined as Location)
                        })
                    );
                };
                return of(location);
            };
            return of(undefined as Location);
        }),
        switchMap(location => {
            if (location) {
                let locationKey = location.details.Key;
                let dailyForcasts = location.dailyForcasts;
                return [locationsActions.updateLocationDailyForcastsSuccess({ locationKey, dailyForcasts })];
            };
            return [validationsActions.addErrorMessage({ message: "server no responding, faild to update daily forcasts" })]
        }),
    ));

    private getLocation(locationKey: string): Observable<Location> {
        return this.store.select(state =>
            state.locations.locations).pipe(
                first(),
                map(locations => locations.find(location => location.details.Key === locationKey))
            );
    };

    private needUpdate(api: string, location: Location): boolean {
        switch (api) {
            case "Current Conditions":
                return !location || !location.currentConditions || 
                    (location.currentConditions.EpochTime * 1000) + 1.8e+6 < Date.now();
            case "Daily Forcasts":
                return !location || !location.dailyForcasts || !location.dailyForcasts.DailyForecasts || 
                    (location.dailyForcasts.DailyForecasts[0].EpochDate * 1000) + 4.32e+7 < Date.now();
            default:
                return true;
        };
    }
}