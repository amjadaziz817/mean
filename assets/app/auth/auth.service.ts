import { Injectable } from "@angular/core";
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { User } from "./user.model";

@Injectable()
export class AuthService {
    constructor(private http: Http) {

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
        .catch((error: Response)=> Observable.throw(error.json()));
    }
}