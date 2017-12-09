import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

// Component
import ActionButton from '../utils/ActionButton';

class BookingAction extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, steps, activeStep, onClickBack, onClickNext } = this.props
    return (
        <div className={classes.actionsContainer}>
            <ActionButton 
              variant='secondary' 
              disabled={activeStep === 0}            
              onClick={onClickBack}
            >
                Back
            </ActionButton>
            <ActionButton variant='primary' onClick={onClickNext}>
                {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
            </ActionButton>
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