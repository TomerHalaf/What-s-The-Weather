import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityModel } from '../models/city.model';
import { CityConditionsModel } from '../models/city-conditions.model';
import { ForecastsModel } from '../models/forecasts.model';

@Injectable()
export class WeatherService {
    apiHttp: string = "https://dataservice.accuweather.com/"
    autocompletePath: string = "locations/v1/cities/autocomplete";
    cityConditionsPath: string = "currentconditions/v1/"
    dailyForecastsPath: string = "forecasts/v1/daily/5day/"
    private apiKey = "CkND2RH0il3H5d0AAdCqb1SH1M7aDnPe";

    constructor(private httpService: HttpClient) { }

    public locationAutoComplete(search: string): Observable<CityModel[]> {
        return this.httpService.get<CityModel[]>(
            this.apiHttp + this.autocompletePath + "?apikey=" + this.apiKey + "&q=" + search
        );
    }
    public getCityConditions(locationKey: string): Observable<CityConditionsModel[]> {
        return this.httpService.get<CityConditionsModel[]>(
            this.apiHttp + this.cityConditionsPath + locationKey + "?apikey=" + this.apiKey
        );
    }

    public get5DaysOfDailyForecasts(locationKey: string): Observable<ForecastsModel> {
        return this.httpService.get<ForecastsModel>(
            this.apiHttp + this.dailyForecastsPath + locationKey + "?apikey=" + this.apiKey + "&metric=true"
        );
    }
}