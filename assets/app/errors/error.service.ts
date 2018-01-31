import { Injectable, EventEmitter } from "@angular/core";
import { Error } from "./error.model";

@Injectable()
export class ErrorService {

    errorOccured : EventEmitter<Error> = new EventEmitter();

    onErrorOccured(error: any) {
        let errorObj = new Error(error.title, error.error.message);

        this.errorOccured.emit(errorObj);
    }
}