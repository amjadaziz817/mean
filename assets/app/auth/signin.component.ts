import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
    selector: 'app-signin',
    templateUrl:'./signin.component.html'
})
export class SigninComponent implements OnInit{

    signinForm: FormGroup

    constructor(private authService: AuthService,
    private router: Router) {

    }
    ngOnInit() {
        this.signinForm = new FormGroup({
            email: new FormControl(null, [Validators.required]),
            password: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        let user = new User(this.signinForm.value.email, this.signinForm.value.password);
        this.authService.signIn(user).subscribe(
            response => {
                console.log('User logged In Successfully!')
                this.router.navigateByUrl('/');
            }
        );
    }
}