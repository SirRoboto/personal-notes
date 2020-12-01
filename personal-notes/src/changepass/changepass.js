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
const firebase = require("firebase");

class ChangepassComponent extends React.Component {

  // State with email, current password, new password, a confirmation fo the new password and error
  constructor() {
    super();
    this.state = {
      email: null,
      currentPass: null,
      newPass: null,
      confirmPass: null,
      Error: ''
    }
  }

  // Similar to login and signup, but instead four fields are present for the user to fill out, followed by a submission
  // Submitting this form will redirect the user to their dashboard, automatically authenticating them
  render() {

    const {classes} = this.props;

    return(
      <main className = {classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className = {classes.paper}>
          <Typography component = 'h1' variant = 'h5'>
            Change your password
          </Typography>
          <form className = {classes.form} onSubmit = {(e) => this.changePassword(e)}>
            <FormControl required fullWidth margin = 'normal'>
              <InputLabel htmlFor = 'email-input'> Enter your email </InputLabel>
              <Input autoComplete = 'email' onChange = {(e) => this.userTyping('email', e)} autoFocus id = 'email-input'> </Input>
            </FormControl>

            <FormControl required fullWidth margin = 'normal'>
              <InputLabel htmlFor = 'password-input'> Enter your current password </InputLabel>
              <Input type = 'password' onChange = {(e) => this.userTyping('password', e)} autoFocus id = 'password-input'> </Input>
            </FormControl>

            <FormControl required fullWidth margin = 'normal'>
              <InputLabel htmlFor = 'new-password-input'> Enter your new password </InputLabel>
              <Input type = 'password' onChange = {(e) => this.userTyping('new-pass', e)} autoFocus id = 'new-password-input'> </Input>
            </FormControl>

            <FormControl required fullWidth margin = 'normal'>
              <InputLabel htmlFor = 'confirm-password-input'> Enter your new password again </InputLabel>
              <Input type = 'password' onChange = {(e) => this.userTyping('confirm-pass', e)} id = 'confirm-password-input'> </Input>
            </FormControl>
            <Button type = 'submit' fullWidth variant = 'contained' color = 'primary' className = {classes.submit}>
              Change Password
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
        </Paper>
      </main>
    );
  }

  // Confirms that the two newly entered passwords match each other
  formIsValid = () => this.state.newPass === this.state.confirmPass;

  // Updates state according to each specific field the user is modifying
  userTyping = (type, e) => {
    switch (type) {

      case 'email':
        this.setState({email: e.target.value});
        break;

      case 'password':
        this.setState({currentPass: e.target.value});
        break;

      case 'new-pass':
        this.setState({newPass: e.target.value});
        break;

      case 'confirm-pass':
        this.setState({confirmPass: e.target.value});
        break;

      default:
        break;
    }
  }

  // Confirms passwords match before authenticating the user and updating their password
  changePassword = (e) => {
    e.preventDefault();

    if(!this.formIsValid()){
      this.setState({signupError: 'Passwords do not match!'});
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.currentPass)
      .then(() => {
        var user = firebase.auth().currentUser;
        user.updatePassword(this.state.newPass).then(() => {
          console.log("Password updated!");
        }, error => {
            this.setState({Error: 'Error in updating password.'});
            console.log(error);
        }).catch((error) => {console.log(error);});
      }).then(() => {
        // redirect to the dashboard after successful authentication
        this.props.history.push('/dashboard')
      }, error => {
          console.log(error);
          this.setState({Error: 'Server error.'});
      })
  }

}

export default withStyles(styles)(ChangepassComponent);
