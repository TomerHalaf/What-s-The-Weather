import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'DayName'
})

export class DayNamePipe implements PipeTransform {
    transform(value: Date): string {
        let date: Date = new Date(value);
        return date.toLocaleDateString("en-US", { weekday: "short" });
    }
}