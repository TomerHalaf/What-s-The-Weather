import { Component } from '@angular/core';
import { HtmlApisHelper } from './shared/helpers/html-apis.helper';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = `What's The Weather`;
    public errorMessage: string[] = [];

    constructor() {
        if (!HtmlApisHelper.isLocalStorage) {
            this.errorMessage = ["for best experience please enable localstorage"];
        }
    }
}
