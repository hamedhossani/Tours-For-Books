import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

// Component
import BookingAction from '../booking/BookingAction';
import BookingOption from '../booking/BookingOption';
import BookingContact from '../booking/BookingContact';
import BookingPayment from '../booking/BookingPayment';

function getSteps() {
  return ['Pick your day', "Let's connect", 'Select payment method'];
}

const BookingContent = (props) => {
  switch (props.activeStep) {
    case 0:
      return <BookingOption />;
    case 1:
      return <BookingContact />;
    case 2:
      return <BookingPayment />;
    default:
      return <div></div>;
  }
}

class TourBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0
    };
    this.handleNext = this.handleNext.bind(this)
    this.handleBack = this.handleBack.bind(this)
  }
  handleNext(){
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack(){
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  render() {
    const { classes } = this.props
    const steps = getSteps();
    const { activeStep } = this.state;
    return (
      <Paper elevation={2} className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel><Typography type='display4'>{label}</Typography></StepLabel>
                <StepContent className={classes.stepContent}>
                  <BookingContent activeStep={activeStep}/>
                  <BookingAction steps={steps} activeStep={activeStep} onClickNext={this.handleNext} onClickBack={this.handleBack} />
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.postSubmitContainer}>
            <Typography>Hooray! Thank you for booking a tour with us. We are so excited to show you around.</Typography>
            <Typography>Please check your email for confirmation.</Typography>
            {/**TFB logo**/}
          </Paper>
        )}
      </Paper>
    )
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  postSubmitContainer: {
    marginTop: 0,
    padding: theme.spacing.unit * 3, // TODO: See TODO note on Stepper
  },
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(TourBook);