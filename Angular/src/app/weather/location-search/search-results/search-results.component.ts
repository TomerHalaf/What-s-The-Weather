import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AutocompleteResponse } from '@models/accuweather-api/autocomplete-response.model';

@Component({
  selector: 'wtw-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
    @Input() results: AutocompleteResponse[];
    @Output() selectedResult = new EventEmitter<AutocompleteResponse>();

    onSelect(result: AutocompleteResponse): void {
        this.selectedResult.emit(result);
    };
}
