import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import update from 'react-addons-update';
import 'whatwg-fetch';

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
  return ['Pick your day', 'Select payment method', 'All done!'];
}

const BookingContent = (props) => {
  switch (props.activeStep) {
    case 0:
      return <BookingOption onChange={props.onChange}/>;
    // case 1:
    //   return <BookingContact onChange={props.onChange}/>;
    case 1:
      return !props.isError?
      <BookingPayment 
        tour={props.tour} 
        onSelectPayment={props.onSelectPayment} 
        onErrorPayment={props.onErrorPayment}
        submittedContent={props.submittedContent}
        isBooked={props.isBooked}
        buttonStatus={props.buttonStatus}
        />
      :
      <div>
        <Typography>Oh no! Something went wrong. Please contact us at: </Typography>
        <Typography color='primary'>inquiry@vietnamtoursforbooks.com</Typography>
      </div>
    case 2:
      return <div>
        <Typography>Hooray! Thank you for booking a tour with us. We are so excited to show you around.</Typography>
        <Typography>Please check your email for confirmation.</Typography>
        {/**TFB logo**/}
      </div>
    default:
      return <div></div>;
  }
}

class TourBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      isError: false,
      isBooked: false,
      buttonStatus: true,
      activeButton: false,
      submittedContent: {}
    };
    this.handleNext = this.handleNext.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.handleBooking = this.handleBooking.bind(this)
    this.handleSelectPayment = this.handleSelectPayment.bind(this)
    this.handleErrorPayment = this.handleErrorPayment.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleButtonStatus = this.handleButtonStatus.bind(this)
  }
  handleNext(){
    this.setState({
      activeStep: this.state.activeStep + 1,
      activeButton: false
    });
  };

  handleBack(){
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };
  
  handleChange(input) {
    const newInput = update(this.state.submittedContent, {$merge: input})
    this.setState({submittedContent: newInput})
  }
  
  handleBooking(){
    this.setState({isBooked: true})
  }
  
  handleButtonStatus(isDisabled){
    this.setState({isDisabled})  
  }
  
  handleSelectPayment(payment){
    if (payment.state === 'approved') {
      this.setState({ activeStep: 3 })
      this.handleNext
    }
    // Trigger webhook to send email
    const { tour } = this.props
    const { submittedContent } = this.state
    const url = 'https://hooks.zapier.com/hooks/catch/2690251/s7buaa/'
    let payload = { tour, submittedContent }
    console.log(payload)
    fetch(url, {
      method: 'POST',
      headers: {
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.status === 200) {
        console.log('Good to go');
      } else {
        console.log('Oops! Something went wrong.');
      }
    })
  }
  
  handleErrorPayment(){
    this.setState({ activeStep: 2, isError: true })
  }

  render() {
    const { classes, tour } = this.props
    const steps = getSteps();
    const { activeStep, isError, isBooked, activeButton, submittedContent } = this.state;
    return (
      <Paper elevation={2} className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel><Typography type='display4'>{label}</Typography></StepLabel>
                <StepContent className={classes.stepContent}>
                  <BookingContent 
                    activeStep={activeStep} 
                    onSelectPayment={this.handleSelectPayment}
                    onErrorPayment={this.handleErrorPayment}
                    onChange={this.handleChange}
                    tour={tour}
                    isError={isError}
                    submittedContent={submittedContent}
                    isBooked={isBooked}
                    buttonStatus={this.handleButtonStatus}
                    />
                  <BookingAction activateButton={activeButton} steps={steps} activeStep={activeStep} onClickNext={this.handleNext} onClickBack={this.handleBack} onClickBooking={this.handleBooking} isDisabled={this.state.buttonStatus} />
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
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