import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const PayPalButton = paypal.Button.driver('react', { React, ReactDOM })

class BookingPayment extends Component {
  constructor(props) {
    super(props);
    this.state={
      paymentId: ''
    }
    this.payment = this.payment.bind(this)
    this.onAuthorize = this.onAuthorize.bind(this)
  }
  
  payment() {
    const { tour, submittedContent } = this.props
    const body = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      transactions: [{
        amount: { total: '0.01', currency: 'USD' }
      }],
      redirect_urls: {
        return_url: 'http://www.vietnamtoursforbooks.com',
        cancel_url: 'http://www.vietnamtoursforbooks.com'
      }
    }
    fetch('/api/make_payment', 
    { 
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json().then(paymentID => {
      console.log(paymentID.id)
      this.setState({ paymentID : paymentID.id })
      // this.onAuthorize(0, paymentID.id)
    }).catch(error => {
      console.log(error)
    })
    )
  }
  
  onAuthorize(payerID, paymentID) {
    const body = {
      payerID,
      paymentID
    }
    fetch('/api/execute_payment', 
    { 
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json().then(result => {
      console.log(result.status)
    }))
  }
  
  render() {
    let style = {
        size: 'responsive',
        color: 'gold',
        shape: 'rect',
        label: 'paypal'
    }
    return (
      <div>
        <PayPalButton
          env={process.env.NODE_ENV==='development'? 'sandbox' : 'production'}
          style={style}
          payment={this.payment}
          commit={true}
          onAuthorize={this.onAuthorize} />
      </div>
    )
  }
}

export default BookingPayment;