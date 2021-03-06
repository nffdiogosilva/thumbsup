import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import {auth} from "../actions";
import CustomAppBar from "../components/CustomAppBar";
import FormErrorHelperText from "../components/FormHelperSnackBar";
import ProgressButton from '../components/ProgressButton';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirm_password: "",
    };
  }
 
  onSubmit = e => {
    e.preventDefault();
    this.props.register(this.state.email, this.state.password, this.state.confirm_password);
  }

  render() {
    if (this.props.isAuthenticated) {
        return <Redirect to="/" />
    }
    return (
      <React.Fragment>
        <CustomAppBar />
        <main className={this.props.classes.layout}>
          <Paper className={this.props.classes.paper}>
            <Avatar className={this.props.classes.avatar}>
             <LockIcon />
            </Avatar>
            <Typography variant="headline">Register</Typography>
            <form className={this.props.classes.form} onSubmit={this.onSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input 
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={e => this.setState({email: e.target.value})}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={e => this.setState({password: e.target.value})}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Confirm Password</InputLabel>
                <Input
                  name="confirm-password"
                  type="password"
                  id="confirm-password"
                  onChange={e => this.setState({confirm_password: e.target.value})}
                />
              </FormControl>
              <ProgressButton message="Register"/>
            </form>
            <br/>
            <FormErrorHelperText />
            <Typography>Already have an account? <Link to="/login">Login</Link></Typography>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
      errors = Object.keys(state.auth.errors).map(field => {
          return {field, message: state.auth.errors[field]};
      });
  }
  return {
      errors,
      isAuthenticated: state.auth.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
      register: (email, password, confirm_password) => dispatch(auth.register(email, password, confirm_password)),
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Register));
