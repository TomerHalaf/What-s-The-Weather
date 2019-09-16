import { CityConditionsModel } from './city-conditions.model';

export class Favorite {
    constructor(
        public id: string = "",
        public name: string = "",
        public currentWeather: CityConditionsModel = new CityConditionsModel()
    ) { }
}