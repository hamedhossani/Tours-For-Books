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
  return ['Pick your day', "Let's connect", 'Make a payment', 'All done!'];
}

const BookingContent = (props) => {
  switch (props.activeStep) {
    case 0:
      return <BookingOption onChange={props.onChange}/>;
    case 1:
      return <BookingContact onChange={props.onChange}/>;
    case 2:
      return !props.isError?
      <BookingPayment 
        tour={props.tour} 
        onSuccessPayment={props.onSuccessPayment} 
        onErrorPayment={props.onErrorPayment}
        submittedContent={props.submittedContent}
        isBooked={props.isBooked}
        />
      :
      <div>
        <Typography>Oh no! Something went wrong. Please contact us at: </Typography>
        <Typography color='primary'>inquiry@vietnamtoursforbooks.com</Typography>
      </div>
    case 3:
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
      activeButton: false,
      submittedContent: {
        date: '',
        numberOfPax: 0,
        name: '',
        email: '',
      }
    };
    this.handleNext = this.handleNext.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.handleBooking = this.handleBooking.bind(this)
    this.handleSuccessPayment = this.handleSuccessPayment.bind(this)
    this.handleErrorPayment = this.handleErrorPayment.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
    const { submittedContent } = this.state
    if (input.type === 'option' || input.type === 'contact'){
      const newInput = update(submittedContent, {$merge: input.fields})
      console.log(newInput)
      this.setState({submittedContent: newInput})
    }
    
    if (submittedContent.date.length>0 && submittedContent.numberOfPax.length>0 
    || submittedContent.name.length>0 && submittedContent.email.length>0) {
      this.setState({activeButton: true})
    } else {
      this.setState({activateButton: false})
    }
  }
  
  handleBooking(){
    this.setState({isBooked: true})
  }
  
  handleSuccessPayment(response){
    // Trigger webhook to send email
    const { tour } = this.props
    const { submittedContent } = this.state
    const url = 'https://hooks.zapier.com/hooks/catch/2690251/s7buaa/'
    let payload = { tour, submittedContent }
    fetch(url, {
      method: 'POST',
      headers: {
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.status === 200) {
        if (response.status === 'success') {
          this.setState({ activeButton: false, activeStep: 3 })
          this.handleNext()
        }
      } else {
        this.setState({ activeButton: false })
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
                <StepLabel><Typography type='display4' component='span'>{label}</Typography></StepLabel>
                <StepContent>
                  <div>
                  <BookingContent 
                    activeStep={activeStep} 
                    onSuccessPayment={this.handleSuccessPayment}
                    onErrorPayment={this.handleErrorPayment}
                    onChange={this.handleChange}
                    tour={tour}
                    isError={isError}
                    submittedContent={submittedContent}
                    isBooked={isBooked}
                    />
                  <BookingAction activeButton={activeButton} steps={steps} activeStep={activeStep} onClickNext={this.handleNext} onClickBack={this.handleBack} onClickBooking={this.handleBooking} />
                  </div>
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