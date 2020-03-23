import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@models/location.model';

@Component({
  selector: 'wtw-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.css']
})
export class FavoriteCardComponent {
    @Input() location: Location;
    @Output() removeClicked = new EventEmitter<string>();
    @Output() moreDetailsClicked = new EventEmitter<Location>();

    getWeatherIcon(): string {
        let weatherIcon = "https://developer.accuweather.com/sites/default/files/";
        let iconNumber = this.location.currentConditions.WeatherIcon;
        weatherIcon += iconNumber < 10 ? "0" + iconNumber + "-s.png" : iconNumber + "-s.png";
        return weatherIcon;
    };
}
