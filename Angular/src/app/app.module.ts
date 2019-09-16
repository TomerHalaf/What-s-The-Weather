import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from '@herolo/app.component';
import { WeatherComponent } from '@herolo/weather/weather.component';
import { FavoritesComponent } from '@herolo/favorites/favorites.component';
import { AppRoutingModule } from '@herolo/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { CitySearchComponent } from './weather/city-search/city-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherService } from './shared/services/weather.service';
import { CurrentWeatherComponent } from './weather/current-weather/current-weather.component';
import { DailyForecastsComponent } from './weather/daily-forecasts/daily-forecasts.component';
import { AddToFavoritesComponent } from './weather/add-to-favorites/add-to-favorites.component';
import { ErrorMessageModelComponent } from './error-message-model/error-message-model.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    FavoritesComponent,
    HeaderComponent,
    CitySearchComponent,
    CurrentWeatherComponent,
    DailyForecastsComponent,
    AddToFavoritesComponent,
    ErrorMessageModelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
      WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
