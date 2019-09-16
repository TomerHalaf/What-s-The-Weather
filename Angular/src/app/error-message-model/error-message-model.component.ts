import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'herolo-error-message-model',
    templateUrl: './error-message-model.component.html',
    styleUrls: ['./error-message-model.component.css']
})
export class ErrorMessageModelComponent implements OnInit {
    @Input() message: string;
    @Output() isClose = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {
        let errorModelElement = document.getElementById("errorModel");
        errorModelElement.style.display ="block";
        errorModelElement.focus();
    }

    public close(){
        this.isClose.emit(true);
    }

}
