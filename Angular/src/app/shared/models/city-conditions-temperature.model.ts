import { TemperatureModel } from './temperature.model';

export class CityConditionsTemperatureModel {
    constructor(
        public Metric: TemperatureModel = new TemperatureModel(),
        public Imperial: TemperatureModel = new TemperatureModel()
    ) { }
}