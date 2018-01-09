import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

// Braintree
var braintree = require('braintree-web-drop-in');

class BookingPayment extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      paypal: {
        flow: 'checkout',
        amount: '',
        currency: 'USD',
        buttonStyle: {
          layout: 'vertical',  
          size:   'medium',    
          shape:  'rect',      
          color:  'gold'
        }
      },
    }
  }
  componentDidMount() {
    //create braintree
    const {tour, submittedContent, onChange} = this.props
    let newPaypal = this.state.paypal
    newPaypal.amount = tour.price.discountAmount * submittedContent.numberOfPax
    this.setState({ paypal: newPaypal })
    
    fetch('/api/client_token', {
      method: 'GET',
      headers: {
        "cache-control": "no-cache",
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.clientToken) {
        // Create braintree instance
        braintree.create({
          authorization: data.clientToken,
          selector: '#dropin-container',
          paypal: newPaypal,
        }, function (error, instance) {
          if(!error && instance) {
            // Get Payload
            onChange({type:'payload', fields: {instance: instance}})
          } else {
            console.log('Error with Braintree.', error)
          }
        })
      } else {
        console.log('Error: Cannot get client token.')
      }
    })
  }
  
  render() {
    const { classes, tour, submittedContent } = this.props
    return (
      <div>
        <Typography type='display1' className={classes.marginBottom}><span className={classes.capitalize}>{submittedContent.name}</span>, your new adventure is almost there !</Typography>
        <Typography type='body1' className={classes.strongText}>Contact Information</Typography>
        <Grid container className={classes.marginBottom}>
          <Grid item xs={8}>
            <Typography type='body1'>Your Name</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography type='body1' className={classes.floatRight}>{submittedContent.name}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography type='body1'>Your Phone Number</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography type='body1' className={classes.floatRight}>{submittedContent.phone}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography type='body1'>Your Email</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography type='body1' className={classes.floatRight}>{submittedContent.email}</Typography>
          </Grid>
        </Grid>
        <Typography type='body1' className={classes.strongText}>Tour Information</Typography>
        <Grid container>
          <Grid item xs={8}>
            <Typography type='body1'>{tour.name}</Typography>
            <Typography type='body1' className={classes.smallText}>on {submittedContent.date}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography type='body1' className={classes.floatRight}>${tour.price.discountAmount}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography type='body1'>x {submittedContent.numberOfPax} {submittedContent.numberOfPax > 1 ? "passengers" : "passenger"}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography type='body1' className={classes.floatRight}>${submittedContent.numberOfPax*tour.price.discountAmount}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography type='body1' className={classes.strongText}>Total: </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography type='body1' className={[classes.strongText, classes.floatRight].join(' ')}>${submittedContent.numberOfPax*tour.price.discountAmount}</Typography>
          </Grid>
        </Grid>
        <div id='dropin-container'>
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  marginBottom: {
    marginBottom: 20
  },
  capitalize: {
    textTransform: 'capitalize'
  },
  smallText: {
    fontSize: '0.7rem'
  },
  floatRight: {
    float: 'right'
  },
  strongText: {
    fontWeight: 'bold'
  }
})

export default (withStyles(styles)(BookingPayment));