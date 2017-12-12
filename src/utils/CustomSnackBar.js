import React from 'react';

import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types'
import classNames from 'classnames';

import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button';

// Define a custom style for button
const styles = theme => ({
});

// Custom Snackbar component
const CustomSnackBar = ( content ) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={5000}
      message={<span id="message-id">{content}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit">
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
}

CustomSnackBar.propTypes = {
};

// Inject style to Custom Button component
export default withStyles(styles)(CustomSnackBar);