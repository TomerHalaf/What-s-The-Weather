import { Component, Input } from '@angular/core';
import { DailyForecastsResponse } from '@models/accuweather-api/daily-forecasts-response.model';

@Component({
    selector: 'wtw-daily-forecasts',
    templateUrl: './daily-forecasts.component.html',
    styleUrls: ['./daily-forecasts.component.css']
})
export class DailyForecastsComponent {
    @Input() forecasts: DailyForecastsResponse;
}
