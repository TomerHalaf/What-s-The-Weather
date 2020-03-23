import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { metaReducers, ROOT_REDUCERS } from '@store/index';
import { AppComponent } from '@wtw/app.component';
import { AppRoutingModule } from '@wtw/app-routing.module';
import { WeatherComponent } from '@wtw/weather/weather.component';
import { DailyForecastsComponent } from '@wtw/weather/daily-forecasts/daily-forecasts.component';
import { CurrentWeatherComponent } from '@wtw/weather/current-weather/current-weather.component';
import { AddToFavoritesComponent } from '@wtw/weather/add-to-favorites/add-to-favorites.component';
import { ErrorMessageModelComponent } from '@wtw/error-message-model/error-message-model.component';
import { FavoritesComponent } from '@wtw/favorites/favorites.component';
import { HeaderComponent } from '@wtw/header/header.component';
import { WeatherService } from '@services/weather.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LocationsEffects } from '@store/effects/locations.effects';
import { SearchesEffects } from '@store/effects/searches.effects';
import { DayNamePipe } from '@pipes/day-name.pipe';
import { LocationSearchComponent } from './weather/location-search/location-search.component';
import { SearchFormComponent } from './weather/location-search/search-form/search-form.component';
import { SearchResultsComponent } from './weather/location-search/search-results/search-results.component';
import { FavoriteCardComponent } from './favorites/favorite-card/favorite-card.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    FavoritesComponent,
    HeaderComponent,
    CurrentWeatherComponent,
    DailyForecastsComponent,
    AddToFavoritesComponent,
    DayNamePipe,
    ErrorMessageModelComponent,
    LocationSearchComponent,
    SearchFormComponent,
    SearchResultsComponent,
    FavoriteCardComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
        metaReducers,
        runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true
        }
    }),
    EffectsModule.forRoot([
        LocationsEffects,
        SearchesEffects
    ]),
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
