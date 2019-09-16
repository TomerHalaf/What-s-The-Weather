import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Favorite } from '@herolo/shared/models/favorite.model';
import { CityConditionsModel } from '@herolo/shared/models/city-conditions.model';

@Component({
    selector: 'herolo-add-to-favorites',
    templateUrl: './add-to-favorites.component.html',
    styleUrls: ['./add-to-favorites.component.css']
})
export class AddToFavoritesComponent implements OnInit, OnChanges {
    @Input() cityName: string = "";
    @Input() locationKey: string = "";
    public favorites: Favorite[] = [];
    public favoritesIconSrc: string;

    constructor() { }

    ngOnInit() {
        this.initFavorites();
        this.setFavoritesIconSrc();
    }

    ngOnChanges(changes) {
        this.setFavoritesIconSrc();
    }

    private getFavoriteIndex(): number {
        if (this.favorites != null && this.favorites != undefined) {
            return this.favorites.findIndex(favorite => {
                if (favorite.id == this.locationKey) {
                    return true;
                }
                return false;
            });
        }
        this.favorites = [];
        return -1;
    }

    private setFavoritesIconSrc() {
        if (this.getFavoriteIndex() > -1) {
            this.favoritesIconSrc = "/assets/images/favorites-colored.svg";
        } else {
            this.favoritesIconSrc = "/assets/images/favorites-grey.svg";
        }
    }

    private initFavorites() {
        try {
            this.favorites = JSON.parse(localStorage.getItem("favorites"));
        } catch (error) { }
        if (this.favorites == null || this.favorites == undefined) {
            this.favorites = [];
        }
    }

    public addToFavorites(): void {
        let index = this.getFavoriteIndex();
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(new Favorite(this.locationKey, this.cityName, new CityConditionsModel()));
        }
        try {
            localStorage.setItem("favorites", JSON.stringify(this.favorites));
        } catch (error) { }
        this.setFavoritesIconSrc();
    }
}