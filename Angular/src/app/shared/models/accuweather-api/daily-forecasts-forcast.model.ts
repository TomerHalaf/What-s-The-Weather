import { DailyForecastsTemperature } from '@models/accuweather-api/daily-forecasts-temperature.model'
import { DailyForecastsForecastIcon } from '@models/accuweather-api/daily-forecasts-forecast-icon.model'

export class DailyForecastsForcast {
    Date: string;
    EpochDate: number;
    Temperature: DailyForecastsTemperature;
    Day: DailyForecastsForecastIcon;
    Night: DailyForecastsForecastIcon;
    Sources: string[];
    MobileLink: string;
    Link: string;
}