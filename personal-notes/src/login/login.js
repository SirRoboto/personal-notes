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
import styles from './styles';
import logo from '../assets/tech.gif'

const firebase = require("firebase");

class LoginComponent extends React.Component {

  // State has email, password and loginError
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      loginError: ''
    }
  }

  render() {

    // Classes is declared as a constant in order to call on themes
    // Submission of login redirects them to their dashboard 
    const {classes} = this.props;

    // Consists of a main container that holds user input fields for email and password, with a submit button at the button
    return(
      <main className = {classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className = {classes.paper}>
          <Typography component = 'h1' variant = 'h5'>
            Log in!
          </Typography>
          <form className = {classes.form} onSubmit = {(e) => this.submitLogin(e)}>
            <FormControl required fullWidth margin = 'normal'>
              <InputLabel htmlFor = 'login-email-input'> Enter your email </InputLabel>
              <Input autoComplete = 'email' onChange = {(e) => this.userTyping('email', e)} autoFocus id = 'login-email-input'> </Input>
            </FormControl>

            <FormControl required fullWidth margin = 'normal'>
              <InputLabel htmlFor = 'login-password-input'> Enter your password </InputLabel>
              <Input type = 'password' onChange = {(e) => this.userTyping('password', e)} id = 'login-password-input'> </Input>
            </FormControl>

            <Button type = 'submit' fullWidth variant = 'contained' color = 'primary' className = {classes.submit}>
              Log In
            </Button>
          </form>
          {
            // Used to verify and display a login error if the field is not empty; by default it is an empty string
            this.state.loginError ?
            <Typography component = 'h5' variant = 'h6' className = {classes.errorText}>
              Incorrect Login Information
            </Typography> :
            null
          }
          <Typography component = 'h5' variant = 'h6'>
            Don't have an account yet?
          </Typography>
          <Link className = {classes.signUpLink} to = '/signup'> Sign Up! </Link>
          <Typography component = 'h5' variant = 'h6'>
            Need to change your password?
          </Typography>
          <Link className = {classes.signUpLink} to = '/changepass'> Change Password! </Link>
        </Paper>
        <div style = {{backgroundImage: `url(${logo})`, height: "25vh"}}></div>
      </main>
    );
  }

  // Captures user input and stores the input based on the given field
  userTyping = (type, e) => {
    switch (type) {
      case 'email':
        this.setState({email: e.target.value});
        break;

      case 'password':
        this.setState({password: e.target.value});
        break;

      default:
        break;
    }
  }

  // Authenticates user based on valid email and password, capturing any errors such as invalid email or password
  submitLogin = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push('/dashboard');
      }, err => {
        this.setState({ loginError: 'Server error.'})
        console.log(err);
      });
  }

}

export default withStyles(styles)(LoginComponent);
