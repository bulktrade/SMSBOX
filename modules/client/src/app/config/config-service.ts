import {Injectable} from "@angular/core";
import {Observable, Observer} from "rxjs";
import {Http, Response} from "@angular/http";

@Injectable()
export class ConfigService {
    public static UserData: Array<Object> = [];

    constructor(private http: Http) {
        this.load('users').subscribe((res) => {
            ConfigService.UserData = res;
        });
    }

    public load(fileName: string) {
        return Observable.create((observer: Observer<Object>) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', './'+ fileName +'.json');
            xhr.onload = () => {
                if (xhr.status === 200) {
                    try {
                        let result = JSON.parse(xhr.responseText);
                        observer.next(result);
                    } catch (ex) {
                        observer.error({
                            exception: ex,
                            xhr: xhr
                        });
                    }
                } else {
                    observer.error(xhr);
                }

                observer.complete();
            };

            xhr.send();
        });
    }
}