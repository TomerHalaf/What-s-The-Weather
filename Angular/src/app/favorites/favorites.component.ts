import { Component, OnInit } from '@angular/core';
import { WeatherService } from '@herolo/shared/services/weather.service';
import { first } from 'rxjs/operators';
import { Favorite } from '@herolo/shared/models/favorite.model';
import { Router } from '@angular/router';

@Component({
    selector: 'herolo-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
    private favorites: Favorite[] = [];
    private iconSite: string = "https://developer.accuweather.com/sites/default/files/";
    public errorMessage: string = "";

    constructor(private weatherService: WeatherService, private router: Router) { }

    ngOnInit() {
        this.initFavorites();
    }

    private initFavorites() {
        this.favorites = [];
        try {
            this.favorites = JSON.parse(localStorage.getItem("favorites"));
        } catch (error) { }
        if (this.favorites == null || this.favorites == undefined) {
            this.favorites = [];
        }
        this.favorites.forEach(favorite => {
            this.weatherService.getCityConditions(favorite.id)
                .pipe(first())
                .subscribe(currentWeather => {
                    favorite.currentWeather = currentWeather[0];
                }, err => this.errorMessage = `Error Code: ${err.Code} Message: ${err.Message}`);
        });
    }

    public getWeatherIcon(weatherIcon: number): string {
        return weatherIcon < 10 ? this.iconSite + "0" + weatherIcon + "-s.png" : this.iconSite + weatherIcon + "-s.png";
    }

    public removeFavorite(name: string) {
        this.favorites = this.favorites.filter(favorite => {
            return favorite.name != name;
        });
        try {
            localStorage.setItem("favorites", JSON.stringify(this.favorites));
        } catch (error) { }
    }

    public openInMain(favorite: Favorite) {
        this.router.navigate(['home'], {
            state: { city: favorite.name }
        });
    }
}