import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import update from 'react-addons-update';
import 'whatwg-fetch';
var shortid = require('shortid');

// Style
import { withStyles } from 'material-ui/styles';
import breakpoints from '../theme/breakpoints';
import Slide from 'material-ui/transitions/Slide';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  withMobileDialog,
} from 'material-ui/Dialog';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import { CircularProgress } from 'material-ui/Progress';

// Component
import TourBookContent from './TourBookContent';
import CloseIcon from 'material-ui-icons/Close';

function getStepName(step) {
  const stepName = ['Pick your day', "Let's connect", 'Review and Make a payment', 'All done!'];
  return stepName[step]
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class TourBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      disabledNext: true,
      errorPayment: false,
      loading: false,
      submittedContent: {
        date: '',
        numberOfPax: '',
        note: '',
        name: '',
        email: '',
        phone: '',
        instance: '',
        payload: ''
      }
    };
    this.handleBack = this.handleBack.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.handleBooking = this.handleBooking.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  handleNext(){
    this.setState({
      activeStep: this.state.activeStep + 1,
      disabledNext: true
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
    const { activeStep, submittedContent } = this.state
    if (input.type === 'option' || input.type === 'contact'){
      const newInput = update(submittedContent, {$merge: input.fields})
      this.setState({submittedContent: newInput})
      switch (activeStep) {
        case 0:
          if (newInput.date && newInput.numberOfPax) {
            this.setState({disabledNext: false})
          } else {
            this.setState({disabledNext: true})
          }
          break
        case 1:
          if (newInput.name && newInput.phone && this.validateEmail(newInput.email)) {
            this.setState({disabledNext: false})
          } else {
            this.setState({disabledNext: true})
          }
          break
        default:
          this.setState({ disabledNext: true })
      }
    } else if (input.type === 'payload') {
      const newInput = update(submittedContent, {$merge: input.fields})
      if (newInput.instance) {
        this.setState({disabledNext: false})
      } else {
        this.setState({disabledNext: true})
      }
      this.setState({submittedContent: newInput})
    }
  }
  
  validateEmail(input) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input))  {  
      return true
    }  else {
      return false  
    }
  }
  
  handleBooking(){
    const { instance, numberOfPax } = this.state.submittedContent
    const { tour } = this.props
    this.setState({ loading: true },
    instance.requestPaymentMethod((err, payload) => {
      if(!err) {
        fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            payload: { nonce: payload.nonce },
            transaction: { 
              paypal: { 
                orderId: shortid.generate(),
                tourId: tour.id,
                amount: tour.price.discountAmount * numberOfPax
              } 
            } 
          })
        })
        .then(res => res.json())
        .then(data => {
          if(data.status==='success'){
            this.setState({ loading: false })
            this.handleNext()
          } else {
            this.setState({ errorPayment : true})
          }
        })
      } else {
        console.log('Error with payload', err)
      }
    })
    )
  }
  
  handleClose(){
    this.props.closeTourBook()
  }

  render() {
    const { classes, tour, booking, fullScreen, theme } = this.props
    const { activeStep, submittedContent, disabledNext, loading, errorPayment } = this.state
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
          { !errorPayment ? 
            <div className={classes.dialogContent}>
              <Typography type='title'>Step {activeStep + 1} of 4: {getStepName(activeStep)}</Typography>
              <div>
                <TourBookContent 
                  activeStep={activeStep}
                  tour={tour}
                  submittedContent={submittedContent}
                  handleChange={this.handleChange}
                />
              </div>
            </div>
            :
            <div className={classes.dialogContent}>
              <Typography type='title'>Oh no! Something went wrong from our end</Typography>
              <div>
                <Typography type='body1'>Please try again or contact us at inquiry@vietnamtoursforbooks.com</Typography>
              </div>
            </div>
          }
          
        </DialogContent>
        {activeStep!==3?
          <DialogActions>
            <Button dense onClick={this.handleBack}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
            {activeStep === 2 ?
              <div className={classes.wrapper}>
                <Button dense onClick={this.handleBooking} disabled={disabledNext || loading} >
                  Book Now
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
              :
              <Button dense onClick={this.handleNext} disabled={disabledNext} >
                Next
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>  
            }
          </DialogActions>
          :
          ''
        }
        <div className={classes.topRight}>
          <IconButton className={classes.closeDialogButton} onClick={this.handleClose}><CloseIcon />
          </IconButton>
        </div>
      </Dialog>
    )
  }
}

const styles = theme => ({
  root: {
  },
  dialog: {
    '& >div:nth-child(2)': {
      height: '90vh',
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
  topRight: {
    position: 'absolute',
    top: 15,
    right: 15,
    '& div + div':{
      marginLeft: theme.spacing.unit * 2
    }
  },
  closeDialogButton: {
    backgroundColor: theme.palette.common.lightWhite,
    color: theme.palette.common.darkGrey,
  },
  wrapper: {
    position: 'relative'
  },
  buttonProgress: {
    color: theme.palette.primary[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
});


export default withMobileDialog()(withStyles(styles, { withTheme: true })(TourBook));