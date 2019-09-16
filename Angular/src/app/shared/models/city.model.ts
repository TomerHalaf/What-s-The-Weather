import { CountryModel } from './country.model';
import { AdministrativeAreaModel } from './administrative-area.model';

export class CityModel {
    constructor(
        public Version: number = 0,
        public Key: string = "",
        public Type: string = "",
        public Rank: number = 0,
        public LocalizedName: string = "",
        public Country: CountryModel = new CountryModel(),
        public AdministrativeArea: AdministrativeAreaModel = new AdministrativeAreaModel()
    ) { }
}