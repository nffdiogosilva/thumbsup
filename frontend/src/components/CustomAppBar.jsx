import React, { Component } from 'react';
import {connect} from "react-redux";
import * as auth from "../actions/auth";

import AppBar from '@material-ui/core/AppBar';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import ProgressButton from '../components/ProgressButton';


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
  },
  buttonProgress: {
    color: '#ffffff',
    position: 'absolute',
    top: '53%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  submit: {
    color: '#ffffff',
    width: 'inherit'
  },
});


class CustomAppBar extends Component {
  loadButton() {
    let button = '';

    const { classes } = this.props;
    
    if (this.props.user !== null) {
      button = <ProgressButton
                variant="outlined"
                color="inherit"
                onClick={this.props.logout}
                message="Logout"
                className={classes.submit}
                progressClassName={classes.buttonProgress}
              />
    }
    return button;
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" className={this.props.classes.appBar}>
          <Toolbar>
            <ThumbUpAltOutlined className={this.props.classes.icon} />
            <Typography variant="title" color="inherit" className={this.props.classes.grow}>ThumbsUp!</Typography>
            {this.loadButton()}
          </Toolbar>
        </AppBar>
      </React.Fragment>
    )
  };
}


const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CustomAppBar));
