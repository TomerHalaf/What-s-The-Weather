import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AutocompleteResponse } from '@models/accuweather-api/autocomplete-response.model';
import { CurrentConditionsResponse } from '@models/accuweather-api/current-conditions-response.model';
import { DailyForecastsResponse } from '@models/accuweather-api/daily-forecasts-response.model';

@Injectable()
export class WeatherService {
    weatherApiKey = 'iBdZx4sgYriXxONY0AUxwf1vZYksKcVV';
    weatherBaseApiUrl = 'https://dataservice.accuweather.com';
    autocompleteApiPath = '/locations/v1/cities/autocomplete';
    currentConditionsApiPath = '/currentconditions/v1/';
    dailyForecastsApiPath = '/forecasts/v1/daily/5day/';
    geoPositionSearchApiPath = '/locations/v1/cities/geoposition/search';

    constructor(private httpService: HttpClient) { }

    locationAutoComplete(search: string): Observable<AutocompleteResponse[]> {
        return this.httpService.get<AutocompleteResponse[]>(
            this.weatherBaseApiUrl + 
            this.autocompleteApiPath + 
            '?apikey=' + 
            this.weatherApiKey + 
            '&q=' + 
            search
        );
    };

    public getLocationByPosition(latitude: number, longitude: number): Observable<AutocompleteResponse[]> {
        return this.httpService.get<AutocompleteResponse[]>(
            '${environment.weatherBaseApiUrl}${environment.geoPositionSearchApiPath}'
            + '?apikey=${environment.weatherApiKey}&q=${latitude},${longitude}'
        );
    }

    getLocationCurrentConditions(locationKey: string): Observable<CurrentConditionsResponse[]> {
        return this.httpService.get<CurrentConditionsResponse[]>(
            this.weatherBaseApiUrl + 
            this.currentConditionsApiPath + 
            locationKey +
            '?apikey=' + 
            this.weatherApiKey
        );
    };

    getLocation5DaysOfDailyForecasts(locationKey: string): Observable<DailyForecastsResponse> {
        return this.httpService.get<DailyForecastsResponse>(
            this.weatherBaseApiUrl + 
            this.dailyForecastsApiPath + 
            locationKey +
            '?apikey=' + 
            this.weatherApiKey +
            '&metric=true'
        );
    }
}