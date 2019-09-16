import { Component } from '@angular/core';
import { CityModel } from '@herolo/shared/models/city.model';
import { Router } from '@angular/router';

@Component({
    selector: 'herolo-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
    public cityName: string = "";
    public city: CityModel = null;

    constructor(private router: Router) {
        if (this.router.getCurrentNavigation().extras.state != undefined
            && this.router.getCurrentNavigation().extras.state.city != undefined) {
            this.cityName = this.router.getCurrentNavigation().extras.state.city;
        } else {
            this.cityName = "Tel Aviv";
        }
    }

    public setCity(city: CityModel): void {
        this.city = city;
    }
}