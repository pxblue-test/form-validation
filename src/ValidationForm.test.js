import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ValidationForm from './ValidationForm';

Enzyme.configure({ adapter: new Adapter() });


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ValidationForm />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('does input validation', () => {
    const validationForm = shallow(<ValidationForm />).instance();

    validationForm.setState({ input: "" });
    validationForm.validateInput();
    expect(validationForm.state.inputError).toBe("required");

    validationForm.setState({ input: "abc" });
    validationForm.validateInput();
    expect(validationForm.state.inputError).toBe("");
})

it('does emails validation', () => {
    const validationForm = shallow(<ValidationForm />).instance();

    validationForm.setState({ email: "" });
    validationForm.validateEmail();
    expect(validationForm.state.emailError).toBe("required");

    let emails = ["adf.kadf@gmail.com", "johnelin@twitter.com", "bob.carls123@facebook.io"];
    for (let i = 0; i < emails.length; i++) {
        validationForm.setState({ email: emails[i] });
        validationForm.validateEmail();
        expect(validationForm.state.emailError).toBe("");
    }

    emails = ["adf.kadf", "johnelin@twitter", "bob.carls123facebook.io"];
    for (let i = 0; i < emails.length; i++) {
        validationForm.setState({ email: emails[i] });
        validationForm.validateEmail();
        expect(validationForm.state.emailError).toBe("Invalid email address");
    }

});

it('does phonenumber validation', () => {
    const validationForm = shallow(<ValidationForm />).instance();

    validationForm.setState({ phoneNumber: "" });
    validationForm.validatePhoneNumber();
    expect(validationForm.state.phoneNumberError).toBe("required");

    let phonenumbers = ["+1(541)754-3010", "+1(234)435-8765", "+1(567)878-0987", "+1(231)348-6512"]; 
    for (let i = 0; i < phonenumbers.length; i++) {
        validationForm.setState({ phoneNumber: phonenumbers[i] });
        validationForm.validatePhoneNumber();
        expect(validationForm.state.phoneNumberError).toBe("");
    }

    phonenumbers = ["+1(636)7363", "+23", "+00(8765)9876-9876", "+11(90098)-7353-234"];
    for (let i = 0; i < phonenumbers.length; i++) {
        validationForm.setState({ phoneNumber: phonenumbers[i] });
        validationForm.validatePhoneNumber();
        expect(validationForm.state.phoneNumberError).toBe("Invalid phone number");
    }
});


it('does old password validation', () => {
    const validationForm = shallow(<ValidationForm />).instance();

    validationForm.setState({ oldPassword: "" });
    validationForm.validateOldPassword();
    expect(validationForm.state.oldPasswordError).toBe("required");

    validationForm.setState({ oldPassword: "abc" });
    validationForm.validateOldPassword();
    expect(validationForm.state.oldPasswordError).toBe("");
})

it('does new password validation', () => {
    const validationForm = shallow(<ValidationForm />).instance();

    validationForm.setState({ newPassword: "" });
    validationForm.validateNewPassword();
    expect(validationForm.state.newPasswordError).toBe("required");

    let passwords = ["sdj!@23kdkddSS", "A^D223@kds", "!@#sd1j@DKW"]
    for (let i = 0; i < passwords.length; i++) {
        validationForm.setState({ newPassword: passwords[i] });
        validationForm.validatePasswordCriteria();
        validationForm.validateNewPassword();
        expect(validationForm.state.newPasswordError).toBe("");
    }

    passwords = ["test123", "Test@paSS", "testpass!123", "TESTPASS@123", "TESTPASS123", "Testpass*123", "!@#sdj@", "", "12311111", "-291223"];
    for (let i = 0; i < passwords.length; i++) {
        validationForm.setState({ newPassword: passwords[i] });
        validationForm.validatePasswordCriteria();
        validationForm.validateNewPassword();
        expect(validationForm.state.newPasswordError).toBe("required");
    }
});

it('does confirm password validation', () => {
    const validationForm = shallow(<ValidationForm />).instance();

    validationForm.setState({ confirmPassword: "" });
    validationForm.validateConfirmPassword();
    expect(validationForm.state.confirmPasswordError).toBe("required");

    validationForm.setState({ newPassword: "iam same as you", confirmPassword: "iam same as you" });
    validationForm.validateConfirmPassword()
    expect(validationForm.state.confirmPasswordError).toBe("");

    validationForm.setState({ newPassword: "iam same as you", confirmPassword: "iam not same as you" });
    validationForm.validateConfirmPassword()
    expect(validationForm.state.confirmPasswordError).toBe("Passwords do not match");

})