import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import breakpoints from '../theme/breakpoints';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
  import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button'

// Component

const styles = theme => ({
  root: {
    '& >div:nth-child(2)':{
      [`@media (min-width: ${breakpoints['md']}px)`]:{
        position: 'fixed',
        bottom: theme.spacing.unit*3,
        right: theme.spacing.unit*3,
      }
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
    const { classes, open, handleApply, handleChange, localTourOpen, customTourOpen, handleReset, fullScreen } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.root}
        >
        <DialogTitle>Filtered By</DialogTitle>
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
          <Button onClick={handleApply} color="primary" raised>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(withMobileDialog()(FilterForm));