import { SearchResults } from '@models/search-results.model';
import { AutocompleteResponse } from '@models/accuweather-api/autocomplete-response.model';

export interface SearchesState {
    searches: SearchResults[];
    currentSearchQuery: string;
}