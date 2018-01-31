import { Injectable } from "@angular/core";
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { User } from "./user.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class AuthService {
    constructor(private http: Http, private errorService: ErrorService) {

    }
    
    headers() {
        let headers = new Headers({'Content-Type': 'application/json'});
        return {
            headers: headers
        }
    }

    signUp(user: User) {
        let data = JSON.stringify(user);
        return this.http
        .post('http://localhost:3000/user/signup', data, this.headers())
        .map((response: Response) => {
           return response.json()
        })
        .catch((error: Response)=> {
            this.errorService.onErrorOccured(error.json());
            return Observable.throw(error.json());
        });
    }

    signIn(user: User) {

        let data = JSON.stringify(user);
        return this.http
        .post('http://localhost:3000/user/signin', data, this.headers())
        .map((response: Response) => {
            let res = response.json();
            localStorage.setItem('token', res.token);
            localStorage.setItem('userId', res.userId);
           return res;
        })
        .catch((error: Response)=> {
            this.errorService.onErrorOccured(error.json());
            return Observable.throw(error.json());
        });
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return !!localStorage.getItem('token');
    }
}