import { Injectable, EventEmitter } from "@angular/core";
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { Message } from "./message.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class MessageService {

    messageIsEdited: EventEmitter<Message> = new EventEmitter();
    
    constructor(private http: Http, private errorService: ErrorService) {

    }
    
    messages: Message[];

    headers() {
        let headers = new Headers({'Content-Type': 'application/json'});
        return {
            headers: headers
        }
    }

    tokenQueryParam() {
        return localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

    }

    addMessage(message: Message) {
        let data = JSON.stringify(message);
        return this.http
        .post('http://localhost:3000/message' + this.tokenQueryParam(), data, this.headers())
        .map((response: Response) => {
            let msg = response.json().obj;
            this.messages.push (new Message(
                msg.content, msg.user.firstName, msg._id, msg.user._id
            ));
           return response.json()
        })
        .catch((error: Response)=> {
            this.errorService.onErrorOccured(error.json());
            return Observable.throw(error.json());
        });
    }

    updateMessage(message: Message) {
        let data = JSON.stringify(message);
        return this.http
        .put('http://localhost:3000/message/'+message.messageId + this.tokenQueryParam(), data, this.headers())
        .map((response: Response) => response.json())
        .catch((error: Response)=> {
            this.errorService.onErrorOccured(error.json());
            return Observable.throw(error.json());
        });
    }

    getMessages() {
        return this.http
        .get('http://localhost:3000/message', this.headers())
        .map((response: Response) => {
            let transformedMessages: Message[] = [];
            let messages = response.json().list;
            for(let message of messages) {
                transformedMessages.push(new Message(message.content, message.user.firstName, message._id, message.user._id));
            }
            this.messages = transformedMessages;
            return transformedMessages;
        })
        .catch((error: Response)=> {
            this.errorService.onErrorOccured(error.json());
            return Observable.throw(error.json());
        });
    }

    editMessage(message: Message) {
        this.messageIsEdited.emit(message);
    }

    deleteMessage(message: Message) {
        
        let data = JSON.stringify(message);
        this.messages.splice(this.messages.indexOf(message), 1);        
        return this.http
        .delete('http://localhost:3000/message/' + message.messageId + this.tokenQueryParam(), this.headers())
        .map((response: Response) => {
            // remove from local collection ...
            return response.json();
        })
        .catch((error: Response)=> {
            this.errorService.onErrorOccured(error.json());
            return Observable.throw(error.json());
        });
    }

    messageBelongToUser(userId: string) {
        return localStorage.getItem('userId') == userId;
    }

}