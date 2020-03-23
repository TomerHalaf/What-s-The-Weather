import { AutocompleteCountry } from '@models/accuweather-api/autocomplete-country.model';
import { AutocompleteAdministrativeArea } from '@models/accuweather-api/autocomplete-administrative-area.model';

export class AutocompleteResponse {
    Version: number;
    Key: string;
    Type: string;
    Rank: number;
    LocalizedName: string;
    Country: AutocompleteCountry;
    AdministrativeArea: AutocompleteAdministrativeArea;
}