import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Close from '@material-ui/icons/Close';
import Done from '@material-ui/icons/Done';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import * as Colors from '@pxblue/colors';

const MAX_CHARS_LIMIT = 30;
const upperCharRegex = new RegExp(/[A-Z]+/);
const lowerCharRegex = new RegExp(/[a-z]+/);
const numberRegex = new RegExp(/[0-9]+/);
const splCharRegex = new RegExp(/(!|@|#|\$|\^|&)+/);
const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
const phoneNumberRegex = new RegExp(/((\(\d{3}\)?)|(\d{3}))([\s-./]?)(\d{3})([\s-./]?)(\d{4})/);




const getValidationIcon = (error) => {
	if (error && error.length > 0) {
		return <Close style={{ color: Colors.red[500] }} />;
	}
	else if (error === '') {
		return <Done style={{ color: Colors.green[500] }} />
	}
	else {
		return ''
	}
}

const getHelperText = (error) => {
	if (error === 'required') {
		return null;
	}
	return error;
}

class ValidationFrom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			oldPassword: '',
			oldPasswordError: null,
			newPassword: '',
			newPasswordError: null,
			confirmPassword: '',
			confirmPasswordError: null,
			passwordErrors: {
				minLengthRequired: "required",
				atleast1UpperCharRequired: "required",
				atleast1LowerCharRequired: "required",
				atleast1NumberRequired: "required",
				atleast1SplCharRequired: "required",
			},
			input: '',
			inputError: null,
			email: '',
			emailError: null,
			phoneNumber: '',
			phoneNumberError: null,
			chars: '',
		};
	}

	onChange = (event) => this.setState({
		[event.target.id]: event.target.value,
		[`${event.target.id}Error`]: null,
	});


	validatePassword = () => {
		const { newPassword } = this.state;
		const passwordErrors = {
			minLengthRequired: newPassword.length >= 8 ? "" : "required",
			atleast1UpperCharRequired: upperCharRegex.test(newPassword) ? "" : "required",
			atleast1LowerCharRequired: lowerCharRegex.test(newPassword) ? "" : "required",
			atleast1NumberRequired: numberRegex.test(newPassword) ? "" : "required",
			atleast1SplCharRequired: splCharRegex.test(newPassword) ? "" : "required",

		}
		this.setState({ passwordErrors });
	}

	doRequiredValidation = (e) => {
		const { id, value } = e.target;
		let error = '';
		if (!value.trim()) {
			error = "required";
		}
		else if(id === "newPassword" && Object.values(this.state.passwordErrors).includes("required")) {
			error = "required";
		}
		else if (id === "confirmPassword" && this.state.newPassword !== this.state.confirmPassword) {
			error = "Passwords do not match";
		}
		this.setState({ [`${id}Error`]: error });

	}

	validateEmail = (e) => {
		const { email } = this.state;
		let emailError = '';
		if (!email.trim()) {
			emailError = "required";
		} else if (!emailRegex.test(email)) {
			emailError = "Invalid email address";
		}
		this.setState({ emailError });
	}

	onPasswordChange = (e) => {
		this.setState({ newPassword: e.target.value, newPasswordError: null }, this.validatePassword);
	}

	onPhoneNumberChange = (e) => {
		let { value } = e.target;
		value = value.replace(/[a-zA-Z]+/, '');
		this.setState({ phoneNumber: value });
	}

	validatePhoneNumber = (e) => {
		const { phoneNumber } = this.state;
		let phoneNumberError = '';
		if (!phoneNumber.trim()) {
			phoneNumberError = "required";
		} else if (!phoneNumberRegex.test(phoneNumber)) {
			phoneNumberError = "Invalid phone number";
		}
		this.setState({ phoneNumberError });
	}

	onCharsChange = (e) => {
		const { value } = e.target;
		if (value.length > MAX_CHARS_LIMIT) {
			return;
		}
		this.setState({ chars: value });
	}

	render() {

		const headerBlock = (
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="Menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" >
						Form Validation
 </Typography>
				</Toolbar>
			</AppBar>
		);
		const passwordValidationBlock = (
			<div style={{ padding: 20 }}>
				<Typography variant='h6'>Password Validation</Typography>
				<Typography variant='body2'>The following example shows how to enforce password strength restrictions and confirmation field matching. The password strength requirements for your application may differ from this example.</Typography>
				<br />
				<Card>
					<CardContent>
						<form>
							<TextField
								// className="textField"
								style={{ paddingBottom: 40 }}
								id="oldPassword"
								label="Old Password"
								type="password"
								value={this.state.oldPassword}
								error={Boolean(this.state.oldPasswordError)}
								required
								fullWidth
								onChange={this.onChange}
								onBlur={this.doRequiredValidation}

							/>

							<TextField
								style={{ paddingBottom: 40 }}
								id="newPassword"
								label="New Password"
								type="password"
								onChange={this.onPasswordChange}
								value={this.state.newPassword}
								error={Boolean(this.state.newPasswordError)}
								onBlur={this.doRequiredValidation}
								required
								fullWidth
							/>

							<TextField
								style={{ paddingBottom: 40 }}
								id="confirmPassword"
								label="Confirm Password"
								type="password"
								helperText={getHelperText(this.state.confirmPasswordError)}
								onChange={this.onChange}
								value={this.state.confirmPassword}
								onBlur={this.doRequiredValidation}
								error={Boolean(this.state.confirmPasswordError)}
								required
								fullWidth
							/>
						</form>
						<p>A Password must contain the following:</p>
						<List component="nav">
							<ListItem>
								{getValidationIcon(this.state.passwordErrors.minLengthRequired)}
								At least 8 characters in length
 </ListItem>
							<ListItem>
								{getValidationIcon(this.state.passwordErrors.atleast1NumberRequired)}
								At least 1 digit
 </ListItem>
							<ListItem>
								{getValidationIcon(this.state.passwordErrors.atleast1UpperCharRequired)}
								At least 1 uppercase letter
 </ListItem>
							<ListItem>
								{getValidationIcon(this.state.passwordErrors.atleast1LowerCharRequired)}
								At least 1 lowercase letter
 </ListItem>
							<ListItem>
								{getValidationIcon(this.state.passwordErrors.atleast1SplCharRequired)}

								At least 1 special character: (valid: ! @ # $ ^ &)


 </ListItem>
						</List>
					</CardContent>
				</Card>
			</div>
		);

		const formFieldsBlock = (
			<div style={{ padding: 20 }}>
				<Typography variant='h6'>Basic Form Fields</Typography>
				<Typography variant='body2'>The following example shows how to perform validation on various input types. The error icon on invalid inputs is optional, but adds redundancy for color blind users.</Typography><br />
				<Card>
					<CardContent>
						<div>
							<TextField
								style={{ paddingBottom: 40 }}
								id="input"
								label="Input"
								fullWidth
								required
								value={this.state.input}
								onChange={this.onChange}
								error={Boolean(this.state.inputError)}
								onBlur={this.doRequiredValidation}
								InputProps={{
									endAdornment:
										(<InputAdornment position="end">
											{getValidationIcon(this.state.inputError)}
										</InputAdornment>),
								}}

							/>

							<TextField
								style={{ paddingBottom: 40 }}
								id="email"
								label="Enter Your Email"
								helperText={getHelperText(this.state.emailError)}
								fullWidth
								required
								value={this.state.email}
								error={Boolean(this.state.emailError)}
								onChange={this.onChange}
								onBlur={this.validateEmail}
								InputProps={{
									endAdornment:
										<InputAdornment position="end">
											{getValidationIcon(this.state.emailError)}
										</InputAdornment>

								}}
							/>

							<TextField
								style={{ paddingBottom: 40 }}
								id="phoneNumber"
								label="Phone Number"
								helperText={getHelperText(this.state.phoneNumberError)}
								fullWidth
								required
								value={this.state.phoneNumber}
								error={Boolean(this.state.phoneNumberError)}
								onChange={this.onPhoneNumberChange}
								onBlur={this.validatePhoneNumber}
								InputProps={{
									endAdornment:
										(<InputAdornment position="end">
											{getValidationIcon(this.state.phoneNumberError)}
										</InputAdornment>),
								}}
								inputProps={{ maxLength: 22 }}
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		);

		const characterLimitsHelperText = (
			<>
				<span>Max {MAX_CHARS_LIMIT} characters</span>
				<span style={{ float: 'right' }}>{`${this.state.chars.length}/${MAX_CHARS_LIMIT}`}</span>
			</>
		);
		const characterLimitsBlock = (
			<div style={{ padding: 20 }}>
				<Typography variant='h6'>Character Limits</Typography>
				<Typography variant='body2'>The following example shows how to restrict the length of an input field. In these cases, you should provide the user an indiction of how many characters are available.</Typography> <br />
				<Card>
					<CardContent>
						<form>
							<TextField
								id="chars"
								label="Enter some text"
								fullWidth
								helperText={characterLimitsHelperText}
								value={this.state.chars}
								onChange={this.onChange}
								inputProps={{ maxLength: MAX_CHARS_LIMIT }}
							/>

						</form>
					</CardContent>
				</Card>
			</div>
		);
		return (
			<div>
				{headerBlock}
				{formFieldsBlock}
				{characterLimitsBlock}
				{passwordValidationBlock}
			</div>
		)
	}
}

export default ValidationFrom;
