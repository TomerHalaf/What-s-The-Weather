import { createAction, props } from '@ngrx/store';
import { Location } from '@models/location.model';
import { DailyForecastsResponse } from '@models/accuweather-api/daily-forecasts-response.model';
import { CurrentConditionsResponse } from '@models/accuweather-api/current-conditions-response.model';

export const addLocation = createAction('Add Location', props<{ location: Location }>());
export const updateLocationCurrentConditions = createAction('Update Location Current Conditions', props<{ locationKey: string }>());
export const updateLocationDailyForcasts = createAction('Update Location Daily Forcasts', props<{ locationKey: string }>());
export const updateLocationSuccess = createAction('Update Location Success', props<{ location: Location }>());
export const updateLocationDailyForcastsSuccess = createAction('Update Location Daily Forcast Success', props<{ locationKey: string, dailyForcasts: DailyForecastsResponse }>());
export const updateLocationCurrentConditionsSuccess = createAction('Update Location Current Conditions Success', props<{ locationKey: string, currentConditions: CurrentConditionsResponse }>());
export const updateLocationFaild = createAction('Update Location Faild', props<{ err: string }>());
export const setSelectLocation = createAction("Select Location", props<{ locationKey: string }>());
export const clearSelectedLocation = createAction("Clear Selected Locations");
export const clearLocations = createAction("Clear Locations");
export const clearError = createAction("Clear Error");