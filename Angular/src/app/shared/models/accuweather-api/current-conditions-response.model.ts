import { CurrentConditionsTemperature } from '@models/accuweather-api/current-conditions-temperature.model';

export class CurrentConditionsResponse {
    LocalObservationDateTime: string;
    EpochTime: number;
    WeatherText: string;
    WeatherIcon: number;
    HasPrecipitation: boolean;
    PrecipitationType: string;
    IsDayTime: boolean;
    Temperature: CurrentConditionsTemperature;
    MobileLink: string;
    Link: string;
}