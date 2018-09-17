import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function CustomSnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      {...other}
    />
  );
}

CustomSnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const SnackbarContentWrapper = withStyles(styles1)(CustomSnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: "0 0 20px 0",
  },
});

class FormErrorHelperText extends React.Component {
  // FIXME: Not the best implementation to display message... needs "bullet proof" solution
  displayMessage() {
    //this.props.errors.forEach(element => {
    //  
    //});
    return this.props.errors[0].message[0];
  }

  onSubmit = e => {
    e.preventDefault();

    this.setState({
      isVisible: false
    })
  }

  render() {
    const {classes, errors} = this.props;
    let renderOutput = '';

    if (errors.length > 0) {
      renderOutput = 
      <div>
        <SnackbarContentWrapper
          variant="error"
          className={classes.margin}
          message={this.displayMessage()}
        />
      </div>
    }

    return ( renderOutput );
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
      errors: errors,
  };
}

export default withStyles(styles2)(connect(mapStateToProps)(FormErrorHelperText));
