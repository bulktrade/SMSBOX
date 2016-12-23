import { Injectable } from "@angular/core";
import { LoginModel } from "../login/login.model";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { TokenService } from "./auth/token.service";

@Injectable()
export class FeathersService {
    private host: string;
    private urlPrefix: string;
    private urlSuffix: string;
    private localEndpoint: string;

    constructor(private http: Http, private tokenService: TokenService, host: string) {
        this.host = host;
        this.localEndpoint = 'authentication';
        this.urlPrefix = this.host + '/';
        this.urlSuffix = '/';
    }

    /**
     * User authentication. Returns a JWT token if authentication was successful
     *
     * @example
     * let userModel = new LoginModel('root', '123f');
     * authentication(userModel) // should get a JWT token
     *
     * @param model
     * @param localEndpoint
     * @return {any}
     */
    authentication(model: LoginModel, localEndpoint?: string) {
        if (typeof localEndpoint === undefined) {
            this.localEndpoint = localEndpoint;
        }

        return Observable.create((observer) => {
            this.http.post(this.urlPrefix + this.localEndpoint, model)
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
    get(id: string, serviceName: string) {
        if (id && serviceName) {

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
    }

    /**
     * Retrieves a list of all resources from the service
     * @param serviceName
     * @return {any}
     */
    find(serviceName: string) {
        if (serviceName) {

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', this.tokenService.getToken());

            return Observable.create((observer) => {
                this.http.get(this.urlPrefix + serviceName + this.urlSuffix,
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
    }

    /**
     * Creates a new resource with data
     * @param data
     * @param serviceName
     * @return {any}
     */
    create(data, serviceName: string) {
        if (data && serviceName) {

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
    }

    /**
     * Replaces the resource identified by id with data
     * @param id
     * @param data
     * @param serviceName
     * @return {any}
     */
    update(id: string, data, serviceName: string) {
        if (id && data && serviceName) {

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
    }

    /**
     * Removes the resource with id
     * @param id
     * @param serviceName
     * @return {any}
     */
    remove(id: string, serviceName: string) {
        if (id && serviceName) {

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
    }

    /**
     *
     * @param skip will skip the specified number of results
     * @param limit will return only the number of results you specify
     * @param serviceName
     * @returns {any}
     */
    pagination(skip: number|string, limit: number|string, serviceName: string) {
        if (serviceName) {
            let query = '?$skip=' + skip + '&$limit=' + limit;

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', this.tokenService.getToken());

            return Observable.create((observer) => {
                this.http.get(this.urlPrefix + serviceName + this.urlSuffix + query,
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

    }
}
