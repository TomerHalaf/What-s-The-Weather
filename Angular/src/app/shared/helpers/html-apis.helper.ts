export class HtmlApisHelper {
    static isLocalStorage(): boolean {
        let test = 'test';
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        };
    };

    static getLocalStorage(key: string): any {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (error) {
            return undefined;
        };
    };

    static setLocalStorage(key: string, value: any): boolean {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            return false;
        };
    };
    
    // public static getCurrentPosition(): Position {
    //     if ("geolocation" in navigator) {
    //         navigator.geolocation.getCurrentPosition(async pos => {
    //             return pos;
    //         },err => return null);
    //     } else {
    //         return null;
    //     }
    // }
}