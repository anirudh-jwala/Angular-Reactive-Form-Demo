import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordChecker } from './custom.validators/password-checker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'signup-reactive';

  registerform: FormGroup;
  submitted = false;

  constructor(private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.registerform = this.formbuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTandC: [false, Validators.requiredTrue],
      },
      {
        validators: PasswordChecker('password', 'confirmPassword'),
      }
    );
  }

  get h() {
    return this.registerform.controls;
  }

  onSubmit = () => {
    this.submitted = true;
    if (this.registerform.invalid) {
      return;
    }
    console.table(this.registerform.value);
    console.table(this.registerform);

    alert('Success Sign up\n' + JSON.stringify(this.registerform.value));
  };

  onReset = () => {
    this.submitted = false;
    this.registerform.reset();
  };
}
