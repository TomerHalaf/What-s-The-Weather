import { HeadlineModel } from './headline.model'
import { DailyForecastModel } from './daily-forecast.model';

export class ForecastsModel {
    constructor(
        public Headline: HeadlineModel = new HeadlineModel(),
        public DailyForecasts: DailyForecastModel[] = []
    ) { }
}