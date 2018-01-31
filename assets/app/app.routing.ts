import {Routes, RouterModule} from '@angular/router'
import { MessagesComponents } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { AUTH_ROUTES } from './auth/auth.routing';

const APP_ROUTES: Routes = [
    {
        path: '', 
        redirectTo: '/messages', 
        pathMatch:'full'
    },
    {
        path: 'messages', 
        component: MessagesComponents
    },
    {
        path: 'auth', 
        component: AuthenticationComponent,
        children: AUTH_ROUTES
    }
];

export const routing = RouterModule.forRoot(APP_ROUTES);