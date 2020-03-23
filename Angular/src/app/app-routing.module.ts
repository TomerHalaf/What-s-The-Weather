import { Routes, RouterModule } from "@angular/router"
import { WeatherComponent } from './weather/weather.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
    {path: "", redirectTo:"/home", pathMatch:"full"},
    {path:"home", component:WeatherComponent},
    {path:"favorites", component:FavoritesComponent},
    {path:"**", redirectTo:"/home", pathMatch:"full"}
];

const appRouter = RouterModule.forRoot(appRoutes);

@NgModule({
    imports: [appRouter]
})

export class AppRoutingModule {}