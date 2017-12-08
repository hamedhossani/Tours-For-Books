import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

class BookingAction extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, steps, activeStep, onClickBack, onClickNext } = this.props
    console.log(steps)
    return (
        <div className={classes.actionsContainer}>
            <Button
                disabled={activeStep === 0}
                onClick={onClickBack}
                className={classes.button}
            >
                Back
            </Button>
            <Button
                raised
                color="primary"
                onClick={onClickNext}
                className={classes.button}
            >
                {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
            </Button>
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
  }
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(BookingAction);