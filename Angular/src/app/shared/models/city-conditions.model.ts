import { CityConditionsTemperatureModel } from './city-conditions-temperature.model';

export class CityConditionsModel {
    constructor(
        public LocalObservationDateTime: string = "",
        public EpochTime: number = 0,
        public WeatherText: string = "",
        public WeatherIcon: number = 0,
        public HasPrecipitation: boolean = false,
        public PrecipitationType: string = "",
        public IsDayTime: boolean = false,
        public Temperature: CityConditionsTemperatureModel = new CityConditionsTemperatureModel(),
        public MobileLink: string = "",
        public Link: string = ""
    ) { }
}