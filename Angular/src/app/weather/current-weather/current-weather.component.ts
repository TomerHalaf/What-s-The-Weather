import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { WeatherService } from '@herolo/shared/services/weather.service';
import { first } from 'rxjs/operators';
import { CityConditionsModel } from '@herolo/shared/models/city-conditions.model';

@Component({
    selector: 'herolo-current-weather',
    templateUrl: './current-weather.component.html',
    styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit,OnChanges {
    @Input() cityName:string;
    @Input() locationKey:string = "";
    public errorMessage:string="";
    public iconSite:string = "https://developer.accuweather.com/sites/default/files/";
    public pageLoaded:boolean = false;
    public cityConditions:CityConditionsModel = new CityConditionsModel();
    public weatherIcon:string;

    constructor(private weatherService: WeatherService) { }

    ngOnInit(): void {
        this.getCityConditions();
    }
    ngOnChanges(changes) {
        this.getCityConditions();
      }

    public getCityConditions(): void {
        this.weatherService.getCityConditions(this.locationKey)
            .pipe(first())
            .subscribe(cityConditions => {
                this.cityConditions = cityConditions[0];
                if (this.cityConditions.WeatherIcon < 10){
                    this.weatherIcon = this.iconSite + "0" + this.cityConditions.WeatherIcon + "-s.png"
                } else {
                    this.weatherIcon = this.iconSite + this.cityConditions.WeatherIcon + "-s.png";
                }
                this.pageLoaded=true;
            },err => {
                if (err.Code != undefined) {
                    this.errorMessage = `Error Code: ${err.Code} Message: ${err.Message}`;
                } else {
                    this.errorMessage = "Server request error";
                }
            });
        }
}
