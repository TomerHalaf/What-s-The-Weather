import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { WeatherService } from '@herolo/shared/services/weather.service';
import { first } from 'rxjs/operators';
import { CityModel } from '@herolo/shared/models/city.model';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'herolo-city-search',
    templateUrl: './city-search.component.html',
    styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {
    @Output() selectedCity = new EventEmitter<CityModel>();
    @Input() searchInput: string;
    public searchForm: FormGroup;
    public isVisible: boolean = false;
    public cities: CityModel[] = [];
    public previousSearches: { search: string, cities: CityModel[] }[] = [];
    public errorMessage: string = "";

    constructor(private weatherService: WeatherService, private formbuilder: FormBuilder) { }

    ngOnInit() {
        if (this.searchInput == undefined || this.searchInput.length == 0) {
            this.searchInput = "Tel Aviv";
        }
        this.buildForm();
        this.setPreviousSearches();
        this.search();
        setTimeout(() => {
            this.selectCity(this.cities[0]);
        }, 200);
    }

    private buildForm() {
        this.searchForm = this.formbuilder.group({
            search: ['', Validators.compose([Validators.required])]
        });
        this.searchForm.setValue({ search: this.searchInput });
    }

    public search(): void {
        if (!this.searchForm.valid && this.searchForm.get("search").value.length > 0) {
            this.errorMessage = "Searching should be done in English letters only";
            this.searchForm.setValue({ search: "" });
            return;
        }
        if (this.previousSearches.find(previousSearches => {
            if (previousSearches.search == this.searchForm.get("search").value) {
                this.cities = previousSearches.cities;
                return true;
            }
            return false;
        })) {
            this.isVisible = true;
        } else {
            this.weatherService.locationAutoComplete(this.searchForm.get("search").value)
                .pipe(first())
                .subscribe(cities => {
                    this.cities = cities;
                    this.previousSearches.push({ search: this.searchInput, cities: this.cities });
                    try {
                        localStorage.setItem("previous searches", JSON.stringify(this.previousSearches));
                    } catch (error) {}
                    this.isVisible = true;
                }, err => this.errorMessage = `Error Code: ${err.Code} Message: ${err.Message}`);
        }
    }

    private setPreviousSearches(): void {
        try {
            this.previousSearches = JSON.parse(localStorage.getItem("previous searches"));
        } catch (error) {}
        if (this.previousSearches == null || this.previousSearches == undefined) {
            this.previousSearches = [];
        }
    }

    public selectCity(city: CityModel): void {
        this.isVisible = false;
        this.searchForm.setValue({ search: city.LocalizedName });
        this.selectedCity.emit(city);
    }

}