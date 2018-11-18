import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

const Message = ({classes, message, messageOpen, handleCloseMessage}) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={messageOpen}
    autoHideDuration={9000}
    SnackbarContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{message}</span>}
    action={[
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        className={classes.close}
        onClick={handleCloseMessage}
      >
        <CloseIcon />
      </IconButton>,
    ]}
  />
);

Message.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  handleCloseMessage: PropTypes.func.isRequired,
  messageOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Message);