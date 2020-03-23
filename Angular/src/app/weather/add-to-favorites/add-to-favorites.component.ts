import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'wtw-add-to-favorites',
    templateUrl: './add-to-favorites.component.html',
    styleUrls: ['./add-to-favorites.component.css']
})
export class AddToFavoritesComponent {
    @Input() isFavorite: boolean;
    @Output() buttonClicked = new EventEmitter<void>();

    getFavoriteIcon(): string {
        if (this.isFavorite) {
            return './assets/images/favorites-colored.svg';
        };
        return './assets/images/favorites-grey.svg';
    };

    // public favoriteClicked(): void {
        // let index = this.getFavoriteIndex();
        // index > -1 ? this.addToFavorites() : this.removeFromFavorites(index);
        // if (HtmlApisHelper.isLocalStorage) {
        //     localStorage.setItem('favorites', JSON.stringify(this.favorites));
        // }
        // this.setFavoritesIconSrc();
    // }
    // private addToFavorites(): void {
    //     // this.s
    //     // this.favorites.push(new Favorite(this.locationKey, this.cityName, new CityConditionsModel()));
    // }
    // private removeFromFavorites(index: number): void {
    //     this.favorites.splice(index, 1);
    // }
    // private getFavoriteIndex(): number {
    //     return this.favorites ? this.favorites.findIndex(favorite => favorite.id == this.locationKey) : -1;
    // }
    // private setFavoritesIconSrc() {
    //     this.getFavoriteIndex() > -1 ? this.favoritesIconSrc = './assets/images/favorites-colored.svg' :
    //         this.favoritesIconSrc = './assets/images/favorites-grey.svg';
    // }
}