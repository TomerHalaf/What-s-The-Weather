import { CurrentConditionsResponse } from '@models/accuweather-api/current-conditions-response.model';
import { DailyForecastsResponse } from '@models/accuweather-api/daily-forecasts-response.model';
import { AutocompleteResponse } from '@models/accuweather-api/autocomplete-response.model';

export class Location {
    details: AutocompleteResponse;
    currentConditions: CurrentConditionsResponse;
    dailyForcasts: DailyForecastsResponse;
}