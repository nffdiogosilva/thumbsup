import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  center: {
    "text-align": 'center',
  }
});

function CircularIndeterminate(props) {
  const { classes } = props;
  const isLoading = props.isLoading;

  if (isLoading) {
    return (
      <div className={classes.center}>
        <CircularProgress className={classes.progress} />
      </div>
    );
  }
  return '';
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);
