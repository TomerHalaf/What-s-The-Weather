import { Component, Input } from '@angular/core';
import { CurrentConditionsResponse } from '@models/accuweather-api/current-conditions-response.model';

@Component({
    selector: 'wtw-current-weather',
    templateUrl: './current-weather.component.html',
    styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent {
    // @Input() locationName: string;
    @Input() currentConditions :CurrentConditionsResponse;

    getIconSrc(): string {
        let src = "https://developer.accuweather.com/sites/default/files/";
        if (this.currentConditions.WeatherIcon < 10) src += 0;
        src += this.currentConditions.WeatherIcon + "-s.png";
        return src;
    };
}
