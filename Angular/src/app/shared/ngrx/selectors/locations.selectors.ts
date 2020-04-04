import { State } from '@store/index'
import { Location } from '@models/location.model';

export function selectLocations(state: State): Location[] {
    return state.locations.locations;
};

export function selectSelectedLocationKey(state: State): string {
    return state.locations.selectedLocationKey;
}

export function selectLocation(state: State, locationKey?: string): Location{
    let locations = selectLocations(state);
    let key = locationKey ? locationKey : selectSelectedLocationKey(state);
    return locations.find(location => location.details.Key === key);
};