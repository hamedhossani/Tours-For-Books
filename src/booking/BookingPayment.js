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
    this.payment = this.payment.bind(this)
  }
  
  payment(data, actions) {
    return actions.payment.create({
      payment: {
        transactions: [{
            amount: { total: '1.00', currency: 'USD' }
        }]
      }
    });
  }
  
  onAuthorize(data, actions) {
    return actions.payment.execute().then(function(payment) {
      console.log('Payment completed:', payment);
    });
  }
  
  render() {
    let client = {
      sandbox:'ARPpBhSOyCpdeA6gdHukK6n2CeDT_MT3vejEFU5AnCR7B-htXAbstreFnwbSQiZtkklZ7f1V3eoqhPBe',
      production: 'something else'
    }
    return (
      <div className='shoppingCart'>
        <PayPalButton
          env='sandbox'
          client={client}
          payment={this.payment}
          commit={true}
          onAuthorize={this.onAuthorize} />
      </div>
    )
  }
}

export default BookingPayment;