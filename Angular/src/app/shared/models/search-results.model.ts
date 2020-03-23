import { AutocompleteResponse } from '@models/accuweather-api/autocomplete-response.model';

export class SearchResults {
    searchQuery: string;
    results: AutocompleteResponse[];
}