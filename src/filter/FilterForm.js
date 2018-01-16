import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import breakpoints from '../theme/breakpoints';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogContent, DialogActions } from 'material-ui/Dialog';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Button from 'material-ui/Button'

// Component

const styles = theme => ({
  root: {
    '& >div:nth-child(2)':{
      position: 'fixed',
      bottom: theme.spacing.unit*3,
      right: theme.spacing.unit*3,
    }
  },
  formWrapper:{
    padding: theme.spacing.unit*3 
  },
});

class FilterForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, open, handleClose, handleChange, localTourOpen, customTourOpen, handleReset } = this.props;
    return (
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.root}
        onClick={handleClose}
        >
        <DialogContent >
          <div className={classes.formWrapper}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={localTourOpen}
                    onChange={(event, checked) => handleChange( 'localTourOpen', checked )}
                  />
                }
                label="Local Tours"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={customTourOpen}
                    onChange={(event, checked) => handleChange('customTourOpen', checked )}
                  />
                }
                label="Custom Tours"
              />
            </FormGroup>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset} color="primary">
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(FilterForm);