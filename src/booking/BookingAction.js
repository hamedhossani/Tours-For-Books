import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Component
import ActionButton from '../utils/ActionButton';

class BookingAction extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, steps, activeStep, activeButton, onClickBack, onClickNext, onClickBooking } = this.props
    let button;
    if (activeStep === steps.length - 1) {
      button= ''
    } else if (activeStep === 2) {
      button= (
        <ActionButton 
          variant='primary' 
          disabled={!activeButton}
          onClick={onClickBooking}>
          Book Now
        </ActionButton>
      )
    } else {
      button= (<ActionButton 
        variant='primary' 
        disabled={!activeButton}
        onClick={onClickNext}>
        Next
      </ActionButton>
      )
    }
    return (
        <div className={classes.actionsContainer}>
          {activeStep === 0 || activeStep === steps.length - 1 ? '' :
            <ActionButton 
              variant='secondary' 
              disabled={activeStep === 0}            
              onClick={onClickBack}
            >
                Back
            </ActionButton>
          }
          { button }
        </div>
      )
    }
}

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(BookingAction);