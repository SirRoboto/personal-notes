import React from 'react';
import { Link } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './styles'
const firebase = require("firebase");

class SignupComponent extends React.Component {

  // States consist of email, password, passwordConfirmation and signupError
  // Submission of signup automatically redirects them to their newly created dashboard
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      passwordConfirmation: null,
      signupError: ''
    };
  }

  // Container holds three valid fields for entry, followed by a submit button in order to create a new user account
  render() {

    const {classes} = this.props;

    return(
      <main className = {classes.main}>
        <CssBaseline> </CssBaseline>
          <Paper className = {classes.paper}>
            <Typography component = 'h1' variant = 'h5'>
              Sign Up!
            </Typography>
            <form onSubmit = {(e) => this.submitSignup(e)} className = {classes.form}>
              <FormControl required fullWidth margin = 'normal'>
                <InputLabel htmlFor = 'signup-email-input'> Enter your email </InputLabel>
                <Input autoComplete = 'email' onChange = {(e) => this.userTyping('email', e)} autoFocus id = 'signup-email-input'> </Input>
              </FormControl>

              <FormControl required fullWidth margin = 'normal'>
                <InputLabel htmlFor = 'signup-password-input'> Create a password </InputLabel>
                <Input type = 'password' onChange = {(e) => this.userTyping('password', e)} id = 'signup-password-input'> </Input>
              </FormControl>

              <FormControl required fullWidth margin = 'normal'>
                <InputLabel htmlFor = 'signup-password-confirmation'> Confirm your password </InputLabel>
                <Input type = 'password' onChange = {(e) => this.userTyping('passwordConfirmation', e)} id = 'signup-password-confirmation'> </Input>
              </FormControl>
              <Button type = 'submit' fullWidth variant = 'contained' color = 'primary' className = {classes.submit}> Submit </Button>
            </form>
            {
              // Used to verify and display a login error if the field is not empty; by default it is an empty string
              this.state.signupError ?
              <Typography component = 'h5' variant = 'h6'>
                {this.state.signupError}
              </Typography> :
              null
            }
            <Typography component = 'h5' variant = 'h6'>
              Already have an account?
            </Typography>
            <Link className = {classes.logInLink} to = '/login'> Log In! </Link>
          </Paper>
      </main>
    );
  }

  // Compares the two user fields for passwords, confirming that the user entered their desired password correctly
  formIsValid = () => this.state.password === this.state.passwordConfirmation;

  // Handles user input and stores them in the appropriate state field
  userTyping = (type, e) => {
    switch (type) {
      case 'email':
        this.setState({email: e.target.value});
        break;

      case 'password':
        this.setState({password: e.target.value});
        break;

      case 'passwordConfirmation':
        this.setState({passwordConfirmation: e.target.value});
        break;

      default:
        break;
    }
  }

  // Performs validation on password submission before creating a new user, returning an error if a disruption to the server occurs
  submitSignup = (e) => {
    e.preventDefault();

    if(!this.formIsValid()){
      this.setState({signupError: 'Passwords do not match!'});
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(authRes => {
        const userObject = {
          email: authRes.user.email
        };
        firebase
          .firestore()
          .collection('users')
          .doc(this.state.email)
          .set(userObject)
          .then(() => {
            // redirect to the dashboard after successful authentication
            this.props.history.push('/dashboard')
          }, databaseErr => {
            console.log(databaseErr);
            this.setState({signupError: 'Failed to add user.'});
          })
      }, authErr => {
        console.log(authErr);
        this.setState({signupError: 'Failed to add user.'});
      })
  }

}

export default withStyles(styles)(SignupComponent);
