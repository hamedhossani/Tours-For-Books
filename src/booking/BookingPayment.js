import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

// Braintree
import BraintreeDropIn from 'braintree-dropin-react';
var braintree = require('braintree-web-drop-in');
var shortid = require('shortid');

class BookingPayment extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      clientToken: '',
      paypal: {
        flow: 'checkout',
        amount: '',
        currency: 'USD',
        buttonStyle: {
          shape: 'rect',
          size: 'responsive',
          label: 'paypal',
          tagline: false
        }
      }
    }
    this.handlePaymentMethod = this.handlePaymentMethod.bind(this)
    this.onCreate = this.onCreate.bind(this)
    this.onDestroyStart = this.onDestroyStart.bind(this)
    this.onDestroyEnd = this.onDestroyEnd.bind(this)
    this.onError = this.onError.bind(this)
  }
  
  componentWillMount() {
    const {tour} = this.props
    let newPaypal = this.state.paypal
    newPaypal.amount = tour.price.discountAmount
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
      this.setState({clientToken:data.clientToken})
    })
  }
  
  handlePaymentMethod(payload){
    const { paypal } = this.state
    const { tour } = this.props
    
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
            amount: tour.price.discountAmount
          } 
        } 
      })
    })
    .then(res => res.json())
    .then(data => {
      this.props.onSuccessPayment(data)
    })
  }

  onCreate(instance){
    console.log('onCreate')
  }

  onDestroyStart(){
    console.log('onDestroyStart')
  }

  onDestroyEnd(){
    console.log('onDestroyEnd')
  }

  onError(error){
    console.log('onError', error)
  }
  
  render() {
    const { classes, isBooked, buttonStatus } = this.props
    return (
      <div>
        {this.state.clientToken &&
        <BraintreeDropIn
          className={classes.root}
          braintree={braintree}
          authorizationToken={this.state.clientToken}
          handlePaymentMethod={this.handlePaymentMethod}
          paypal={this.state.paypal}
          paypalCredit={this.state.paypal}
          onCreate={this.onCreate}
          onDestroyStart={this.onDestroyStart}
          onDestroyEnd={this.onDestroyEnd}
          onError={this.onError}
          renderSubmitButton={(ref) => {isBooked? ref.onClick() : ''}}
        />
        }
      </div>
    )
  }
}

const styles = theme => ({
  // padding: 20,
  // '&.braintree-dropin-react-submit-btn-wrapper': {
  //   padding: 10,
  //   backgroundColor: '#eee',
  // }
})

export default withStyles(styles)(BookingPayment);