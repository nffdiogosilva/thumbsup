import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
    width: '100%',
  },
  buttonSuccess: {
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
  fabProgress: {
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    position: 'absolute',
    top: '70%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    width: 'inherit'
  },
});

class ProgressButton extends React.Component {
  defaultOnClickListener(e) {
    return true;
  }

  render() {
    const { classes, message, requestOnProgress } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Button
            type={this.props.hasOwnProperty('type') ? this.props.type : "submit"}
            variant={this.props.hasOwnProperty('variant') ? this.props.variant : "raised"}
            color={this.props.hasOwnProperty('color') ? this.props.color : "primary"}
            className={this.props.hasOwnProperty('className') ? this.props.className : classes.submit}
            disabled={requestOnProgress}
            onClick={this.props.hasOwnProperty('onClick') ? this.props.onClick : this.defaultOnClickListener}
          >
            {message}
          </Button>
          {requestOnProgress && <CircularProgress size={24}
                                  className={this.props.hasOwnProperty('progressClassName') ? this.props.progressClassName : classes.buttonProgress} 
                                />}
        </div>
      </div>
    );
  }
}

ProgressButton.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
};


const mapStateToProps = state => {
    return {
        requestOnProgress: state.auth.isLoading
    };
}

export default withStyles(styles)(connect(mapStateToProps)(ProgressButton));
