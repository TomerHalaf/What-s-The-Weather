import { Location } from '@models/location.model';

export interface LocationsState {
    locations: Location[];
    selectedLocationKey: string;
    error: string|null;
}