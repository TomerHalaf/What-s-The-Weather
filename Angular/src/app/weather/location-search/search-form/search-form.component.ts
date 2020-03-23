import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'wtw-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit, OnChanges {
    @Input() searchInput: string;
    @Output() search = new EventEmitter<string>();
    searchForm: FormGroup;

    constructor(private formbuilder: FormBuilder) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.searchInput && this.searchForm) {
            this.searchForm.setValue({searchInput: this.searchInput});
            this.search.emit(this.searchForm.get("searchInput").value);
        };
    }

    ngOnInit() {
        this.buildForm();
        this.search.emit(this.searchForm.get("searchInput").value);
    }

    private buildForm(): void {
        this.searchForm = this.formbuilder.group({
            searchInput: [this.searchInput, Validators.compose([Validators.required, Validators.pattern("[A-Za-z0-9\\s]+")])]
        });
    };
}
