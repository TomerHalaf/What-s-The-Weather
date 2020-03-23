import { DailyForecastsForcast } from '@models/accuweather-api/daily-forecasts-forcast.model';
import { DailyForecastsHeadline } from '@models/accuweather-api/daily-forecasts-headline.model';

export class DailyForecastsResponse {
    Headline: DailyForecastsHeadline;
    DailyForecasts: DailyForecastsForcast[];
}