import { DailyForecastTemperatureModel } from './daily-forecast-temperature.model'
import { ForeCastIconModel } from './forecast-icon.model'

export class DailyForecastModel {
    constructor(
        public Date: string = "",
        public EpochDate: number = 0,
        public Temperature: DailyForecastTemperatureModel = new DailyForecastTemperatureModel(),
        public Day: ForeCastIconModel = new ForeCastIconModel(),
        public Night: ForeCastIconModel = new ForeCastIconModel(),
        public Sources: string[] = [],
        public MobileLink: string = "",
        public Link: string = ""
    ) { }
}