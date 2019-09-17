import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WeatherService } from '@herolo/shared/services/weather.service';
import { first } from 'rxjs/operators';
import { ForecastsModel } from '@herolo/shared/models/forecasts.model';

@Component({
    selector: 'herolo-daily-forecasts',
    templateUrl: './daily-forecasts.component.html',
    styleUrls: ['./daily-forecasts.component.css']
})
export class DailyForecastsComponent implements OnInit, OnChanges {
    @Input() locationKey: string = "";
    public errorMessage: string = "";
    public forecasts: ForecastsModel = new ForecastsModel();
    public isVisible: boolean = false;

    constructor(private weatherService: WeatherService) { }

    ngOnInit() {
        this.getForecasts();
    }

    ngOnChanges(changes) {
        this.getForecasts();
    }

    private getForecasts(): void {
        this.weatherService.get5DaysOfDailyForecasts(this.locationKey)
            .pipe(first())
            .subscribe(forcasts => {
                this.forecasts = forcasts;
                this.isVisible = true;
            }, err => {
                if (err.Code != undefined) {
                    this.errorMessage = `Error Code: ${err.Code} Message: ${err.Message}`;
                } else {
                    this.errorMessage = "Server request error";
                }
            });
    }

    public getDayName(dateString: string): string {
        let date = new Date(dateString);
        return date.toLocaleDateString("en-US", { weekday: "short" });
    }
}
