import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Herolo';
    public errorMessage: string = "";

    constructor() {
        let test = "test"
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
        } catch (error) {
            this.errorMessage = "for best experience please enable localstorage";
        }
    }
}
