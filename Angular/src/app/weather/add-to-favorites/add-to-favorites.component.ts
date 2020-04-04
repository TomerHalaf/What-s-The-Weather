import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'wtw-add-to-favorites',
    templateUrl: './add-to-favorites.component.html',
    styleUrls: ['./add-to-favorites.component.css']
})
export class AddToFavoritesComponent {
    @Input() isFavorite: boolean;
    @Output() removeClicked = new EventEmitter<void>();
    @Output() addClicked = new EventEmitter<void>();

    getFavoriteIcon(): string {
        if (this.isFavorite) {
            return './assets/images/favorites-colored.svg';
        };
        return './assets/images/favorites-grey.svg';
    };

    buttonClicked(): void {
        this.isFavorite ? this.removeClicked.emit() : this.addClicked.emit();
    }
}