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
    this.onAuthorize = this.onAuthorize.bind(this)
  }
  
  payment(data, actions) {
    const { tour, submittedContent } = this.props
    return actions.payment.create({
      payment: {
        "transactions": [
          {
            "amount": {
              "total": `${tour.price.discountAmount}`,
              "currency": "USD",
            },
            "description": 
              `TOUR_ID:${tour.id} 
              # NAME: ${submittedContent.name}
              # TOUR_DATE: ${submittedContent.date} 
              }`,
          }
        ]
      }
    });
  }
  
  onAuthorize(data, actions) {
    return actions.payment.execute()
      .then(payment => {
        this.props.onSelectPayment(payment)
      .catch(error => {
        this.props.onErrorPayment
      });
    })
  }
  
  render() {
    let client = {
      sandbox:'ARPpBhSOyCpdeA6gdHukK6n2CeDT_MT3vejEFU5AnCR7B-htXAbstreFnwbSQiZtkklZ7f1V3eoqhPBe',
      production: 'something else'
    }
    let style = {
        size: 'responsive',
        color: 'gold',
        shape: 'rect',
        label: 'paypal'
    }
    return (
      <div>
        <PayPalButton
          env='sandbox'
          client={client}
          style={style}
          payment={this.payment}
          commit={true}
          onAuthorize={this.onAuthorize} />
      </div>
    )
  }
}

export default BookingPayment;