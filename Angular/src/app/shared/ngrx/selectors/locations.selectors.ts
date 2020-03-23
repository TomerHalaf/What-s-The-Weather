import { State } from '@store/index'
import { createSelector, select } from '@ngrx/store'
import { Location } from '@models/location.model';
import { LocationsState } from '@store/states/locations.state';
import { pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const selectLocations = (state: State) => state.locations;

// export const selectLocation = createSelector(
//     selectLocations,
//     (locations: LocationsState, key: string) => {
//         key = key ? key : locations.selectedLocationKey;
//         return locations.locations.find(location => location.details.Key === key);
//     }
// );

export const selectLocation = (key?: string) => {
    return pipe(
        select(selectLocations),
        map(locations => {
            key = key ? key : locations.selectedLocationKey;
            return locations.locations.find(location => location.details.Key === key);
        })
    );
};

// export const selectLocationDetails = (key?: string) => {
//     return pipe(
//         select(selectLocation),
//         switchMap(location => location),
//         map(location => location ? location.details : null)
//     );
// };

// export const selectLocationCurrentConditions = (key?: string) => {
//     return pipe(
//         select(selectLocation),
//         map(location => location ? location.currentConditions : null)
//     );
// };

// export const selectLocationDailyForcasts = (key?: string) => {
//     return pipe(
//         select(selectLocation),
//         map(location => location ? location.dailyForcasts : null)
//     );
// };