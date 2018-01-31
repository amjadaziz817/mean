import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";

@Component({
    selector: 'app-logout',
    template: `
        <div class= "col-md-8 col-md-offset-2">
            <button class = "btn btn-danger" (click) = "logout()"> 
                Logout 
            </button> 
        </div>
    `
})
export class LogoutComponent {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {

    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/auth', 'signin']);
    }
}