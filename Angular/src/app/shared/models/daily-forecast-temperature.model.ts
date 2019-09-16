import { TemperatureModel } from './temperature.model';

export class DailyForecastTemperatureModel {
    constructor(
        public Minimum: TemperatureModel = new TemperatureModel(),
        public Maximum: TemperatureModel = new TemperatureModel()
    ) { }
}