import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from "./app.component";
import { MessageComponent } from './messages/message.component';
import { MessageComponenetList } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input-component';
import { MessageService } from './messages/message.service';
import { MessagesComponents } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { routing } from './app.routing';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';
import { LogoutComponent } from './auth/logout.component';
import { AuthService } from './auth/auth.service';

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageComponenetList,
        MessageInputComponent,
        MessagesComponents,
        AuthenticationComponent,
        HeaderComponent,
        SigninComponent,
        SignupComponent,
        LogoutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule, 
        ReactiveFormsModule, 
        routing],
    bootstrap: [AppComponent],
    providers: [MessageService, AuthService]
})
export class AppModule {

}