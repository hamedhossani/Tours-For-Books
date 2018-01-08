import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import update from 'react-addons-update';
import 'whatwg-fetch';

// Style
import { withStyles } from 'material-ui/styles';
import breakpoints from '../theme/breakpoints';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  withMobileDialog,
} from 'material-ui/Dialog';
import MobileStepper from 'material-ui/MobileStepper';
import Paper from 'material-ui/Paper';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';


// Component
import BookingOption from '../booking/BookingOption';
import Slide from 'material-ui/transitions/Slide';
import TourBookContent from './TourBookContent';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function getStepName(step) {
  const stepName = ['Pick your day', "Let's connect", 'Make a payment', 'All done!'];
  return stepName[step]
}

class TourBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      disabledNext: true,
      submittedContent: {
        date: '',
        numberOfPax: '',
        note: '',
        name: '',
        email: '',
        phone: ''
      }
    };
    this.handleBack = this.handleBack.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleNext(){
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack(){
    if (this.state.activeStep==0){
      this.props.backTourCardMediaContent()
    } else {
      this.setState({
        activeStep: this.state.activeStep - 1,
      });
    }
  };
  
  handleChange(input) {
    const { submittedContent } = this.state
    if (input.type === 'option' || input.type === 'contact'){
      const newInput = update(submittedContent, {$merge: input.fields})
      this.setState({submittedContent: newInput})
      if (newInput.date && newInput.numberOfPax) {
        this.setState({disabledNext: false})
      } else {
        this.setState({disabledNext: true})
      }
    }
  }
  
  handleBooking(){
  }
  
  handleSuccessPayment(){
  }
  
  handleErrorPayment(){
  }

  render() {
    const { classes, tour, booking, fullScreen, theme } = this.props
    const { activeStep, disabledNext } = this.state
    const { date, numberOfPax, note, name, email, phone } = this.state.submittedContent
    console.log(disabledNext)
    return (
      <Dialog
          fullScreen={fullScreen}
          open={booking}
          transition={Transition}
          keepMounted
          aria-labelledby="responsive-dialog-title"
          className={[classes.dialog, classes.hiddenScrollX].join(' ')}
      >
        <DialogContent className={classes.hiddenScrollY}>
          <div className={classes.dialogContent}>
            <Typography type='display4'>{tour.name}</Typography>
            <Typography type='title'>Step {activeStep + 1} of 6: {getStepName(activeStep)}</Typography>
            <div>
              <TourBookContent 
                activeStep={activeStep}
                date={date}
                numberOfPax={numberOfPax}
                note={note}
                name={name}
                email={email}
                phone={phone}
                handleChange={this.handleChange}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button dense onClick={this.handleBack}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
          <Button dense onClick={this.handleNext} disabled={activeStep === 5 || disabledNext} >
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const styles = theme => ({
  root: {
  },
  dialog: {
    '& >div:nth-child(2)': {
      width: '100%'
    },
    [`@media (max-width: ${breakpoints['sm']}px)`]:{
      marginTop: 40,
      height: '90%',
    }
  },
  dialogContent: {
    padding: '5%'
  },
  hiddenScrollX: {
    [`@media (min-width: ${breakpoints['md']}px)`]:{
      '& >div' : {
        overflowX: 'hidden'
      }
    }
  },
  hiddenScrollY: {
    [`@media (min-width: ${breakpoints['md']}px)`]:{
      marginRight: -18,
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 38,
    paddingLeft: '5%',
    marginBottom: theme.spacing.unit,
  },
});


export default withMobileDialog()(withStyles(styles, { withTheme: true })(TourBook));