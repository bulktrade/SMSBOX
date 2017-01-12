import { Injectable } from "@angular/core";
import { Http, Response, Headers, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs";
import { TokenService } from "./auth/token.service";

const HOST = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3030';

@Injectable()
export class FeathersService {
    private urlPrefix: string;
    private urlSuffix: string;
    private localEndpoint: string;

    constructor(private http: Http, private tokenService: TokenService) {
        this.localEndpoint = 'authentication';
        this.urlSuffix = '/';
        this.urlPrefix = HOST + this.urlSuffix;
    }

    /**
     * Sends mail. Returns a forgotten password
     * @param email
     * @returns {any}
     */
    sendMail(email: string = '') {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return Observable.create((observer) => {
            this.http.post(this.urlPrefix + 'send-mail', { email: email },
                { headers: headers })
                .subscribe((res: Response) => {
                    observer.next(res);
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                    observer.complete();
                });

        });
    }

    /**
     * User authentication. Returns a JWT token if authentication was successful
     * @param username
     * @param password
     * @param localEndpoint
     * @returns {any}
     */
    authentication(username: string = '', password: string = '', localEndpoint?: string) {
        if (localEndpoint) {
            this.localEndpoint = localEndpoint;
        }

        return Observable.create((observer) => {
            this.http.post(this.urlPrefix + this.localEndpoint, {
                username: username,
                password: password
            })
                .subscribe((res: Response) => {
                    observer.next(res);
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                    observer.complete();
                });

        });
    }

    /**
     * Retrieves a single resource with the given id from the service.
     * @param id
     * @param serviceName
     * @return {any}
     */
    get(id: string = '', serviceName: string = '') {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.tokenService.getToken());

        return Observable.create((observer) => {
            this.http.get(this.urlPrefix + serviceName + this.urlSuffix + id,
                { headers: headers })
                .subscribe((res: Response) => {
                    observer.next(res);
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                    observer.complete();
                });

        });
    }

    /**
     * Retrieves a list of all resources from the service
     * @param serviceName
     * @param search
     * @returns {any}
     */
    find(serviceName: string = '', search?: string|URLSearchParams) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.tokenService.getToken());

        return Observable.create((observer) => {
            this.http.get(this.urlPrefix + serviceName + this.urlSuffix,
                {
                    headers: headers,
                    search: search ? search : ''
                })
                .subscribe((res: Response) => {
                    observer.next(res);
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                    observer.complete();
                });

        });
    }

    /**
     * Creates a new resource with data
     * @param data
     * @param serviceName
     * @return {any}
     */
    create(data = {}, serviceName: string = '') {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.tokenService.getToken());

        return Observable.create((observer) => {
            this.http.post(this.urlPrefix + serviceName, data,
                { headers: headers })
                .subscribe((res: Response) => {
                    observer.next(res);
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                    observer.complete();
                });

        });
    }

    /**
     * Replaces the resource identified by id with data
     * @param id
     * @param data
     * @param serviceName
     * @return {any}
     */
    update(id: string = '', data = {}, serviceName: string = '') {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.tokenService.getToken());

        return Observable.create((observer) => {
            this.http.put(this.urlPrefix + serviceName + this.urlSuffix + id, data,
                { headers: headers })
                .subscribe((res: Response) => {
                    observer.next(res);
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                    observer.complete();
                });

        });
    }

    /**
     * Removes the resource with id
     * @param id
     * @param serviceName
     * @return {any}
     */
    remove(id: string = '', serviceName: string = '') {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.tokenService.getToken());

        return Observable.create((observer) => {
            this.http.delete(this.urlPrefix + serviceName + this.urlSuffix + id,
                { headers: headers })
                .subscribe((res: Response) => {
                    observer.next(res);
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                    observer.complete();
                });

        });
    }

    /**
     * Use the skip/limit to paginate a data
     * @param skip will skip the specified number of results
     * @param limit will return only the number of results you specify
     * @param serviceName
     * @returns {any}
     */
    pagination(skip: number|string = '', limit: number|string = '', serviceName: string = '') {
        let search = new URLSearchParams();
        search.set('skip', skip + '');
        search.set('limit', limit + '');

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.tokenService.getToken());

        return Observable.create((observer) => {
            this.http.get(this.urlPrefix + serviceName + this.urlSuffix,
                {
                    headers: headers,
                    search: search
                })
                .subscribe((res: Response) => {
                    observer.next(res);
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                    observer.complete();
                });

        });
    }
}
