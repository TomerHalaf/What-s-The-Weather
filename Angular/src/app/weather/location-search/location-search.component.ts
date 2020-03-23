import { Component, EventEmitter, Output, Input } from '@angular/core';
import { AutocompleteResponse } from '@models/accuweather-api/autocomplete-response.model';
import { SearchResults } from '@models/search-results.model';

@Component({
  selector: 'wtw-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css']
})
export class LocationSearchComponent {
    @Output() search = new EventEmitter<string>();
    @Output() selectedResult = new EventEmitter<AutocompleteResponse>();
    @Input() results: SearchResults;
    newSearch: string = "Tel-Aviv";
    showResults: boolean = false;

    selectResult(result: AutocompleteResponse) {
        this.newSearch = result.LocalizedName;
        this.selectedResult.emit(result);
    };
}