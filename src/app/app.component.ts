import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, ValidationErrors } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Forms Validation';

  //Password Match Validator
  userPassword: FormGroup;
  passwordFormGroup:FormGroup;
  userForm: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  passLength: boolean = false;
  specialFlag: boolean = false;
  numberFlag: boolean = false;
  upperFlag: boolean = false;
  lowerFlag: boolean = false;


  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.userPassword = this.fb.group({
      oldPassword: ['', Validators.required],
    })
    this.passwordFormGroup = this.fb.group({
      newPassword: ['', Validators.compose([
        Validators.required, Validators.minLength(8)])],
      confirmPassword: ['', Validators.required],
    }, {
        validator: this.checkPasswords
      })
    this.userForm = this.fb.group({
      inputFC: ['', Validators.required,],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)])],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern(/((\(\d{3}\)?)|(\d{3}))([\s-./]?)(\d{3})([\s-./]?)(\d{4})/)])],

    })

  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('newPassword').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { passwordsDoNotMatch: true }
  }

  checkPasswordStrength(passWord) {
    this.passLength = passWord.length > 7;
    this.specialFlag = passWord.match(/[!@#$^&]/);
    this.numberFlag = passWord.match(/[0-9]/);
    this.upperFlag = passWord.match(/[A-Z]/);
    this.lowerFlag = passWord.match(/[a-z]/);
  }
}