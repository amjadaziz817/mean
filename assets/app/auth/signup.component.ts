import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    constructor(private authService: AuthService, private router: Router
    ) {

    }
    ngOnInit() {
        this.signupForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required]),
            password: new FormControl(null, Validators.required)
        });
    }

    onSave() {
        let formValue = this.signupForm.value;
        let user = new User(formValue.email, formValue.password, formValue.firstName, formValue.lastName);
        this.authService.signUp(user).subscribe(
            data => {
                console.log('User Created Successfully');
                this.router.navigateByUrl('/');
            },
            error => {
                console.error('User creation failed!' + error.title);
            }
        );
    }
}