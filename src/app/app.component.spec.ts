import { TestBed, async, ComponentFixture, } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {AppModule} from "./app.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule
} from '@angular/material';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      
      imports: [
        MatAutocompleteModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatToolbarModule,
        AppModule,
        FormsModule,
        ReactiveFormsModule
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
       
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('allows field with a valid email address', () => {
    component.userForm.controls.email.setValue("admin@123.com");
    expect(component.userForm.controls.email.valid).toBeTruthy();
  component.userForm.controls.email.setValue("admin@123");
  expect(component.userForm.controls.email.valid).toBeFalsy();
});
it('allows field with a valid phone number', () => {
  component.userForm.controls.phoneNumber.setValue("1234567898");
  expect(component.userForm.controls.phoneNumber.valid).toBeTruthy();
  component.userForm.controls.phoneNumber.setValue("123456789");
  expect(component.userForm.controls.phoneNumber.valid).toBeFalsy();
});
it('allows field with a valid input', () => {
  component.userForm.controls.inputFC.setValue("qwerty12");
  expect(component.userForm.controls.inputFC.valid).toBeTruthy();
});
it('allows field with a valid old password', () => {
  component.userPassword.controls.oldPassword.setValue("qwert12");
  expect(component.userPassword.controls.oldPassword.valid).toBeTruthy();
});
it('allows field with a valid new password', () => {
  component.passwordFormGroup.controls.newPassword.setValue("qwert12");
  expect(component.passwordFormGroup.controls.newPassword.valid).toBeFalsy();
});
it('allows field with a valid confirm password', () => {
  component.passwordFormGroup.controls.newPassword.setValue("qwert12");
  component.passwordFormGroup.controls.confirmPassword.setValue("qwert12");
  expect(component.passwordFormGroup.controls.newPassword.value).toEqual(component.passwordFormGroup.controls.confirmPassword.value);

});

});
