import { createReducer, on } from '@ngrx/store';
import * as locationsActions from '@store/actions/locations.actions';
import { HtmlApisHelper } from '@helpers/html-apis.helper';
import { LocationsState } from '@store/states/locations.state';
import { Location } from '@models/location.model';

const initialState: LocationsState = {
    locations: HtmlApisHelper.getLocalStorage("locations") || [],
    selectedLocationKey: undefined
};

export const locationsReducer = createReducer(initialState,
    on(locationsActions.addLocation, (state, action) => {
        let locations = state.locations.some(location => 
            location.details.Key === action.location.details.Key) ? [ ...state.locations ] : [ ...state.locations, action.location ];
        HtmlApisHelper.setLocalStorage("locations", locations);
        return ({ ...state, locations })
    }),
    on(locationsActions.updateLocationCurrentConditionsSuccess, (state, action) => {
        let locations = state.locations.map(location => 
            location.details.Key === action.locationKey ? { ...location, currentConditions: action.currentConditions } : location);
        HtmlApisHelper.setLocalStorage("locations", locations);
        return ({ ...state, locations });
    }),
    on(locationsActions.updateLocationDailyForcastsSuccess, (state, action) => {
        let locations = state.locations.map(location => 
            location.details.Key === action.locationKey ? { ...location, dailyForcasts: action.dailyForcasts } : location);
        HtmlApisHelper.setLocalStorage("locations", locations);
        return ({ ...state, locations });
    }),
    on(locationsActions.clearLocations, (state, action) => {
        HtmlApisHelper.setLocalStorage("locations", []);
        return ({ ...state, locations: [] as Location[] });
    }),
    on(locationsActions.clearSelectedLocation, (state, action) => 
        ({ ...state, selectedLocationKey: undefined })),
    on(locationsActions.setSelectedLocationKey, (state, action) => 
        ({ ...state, selectedLocationKey: action.locationKey }))
);