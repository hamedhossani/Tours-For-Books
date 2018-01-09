import React, { Component } from 'react';
import 'whatwg-fetch';

// Style
import Typography from 'material-ui/Typography';

// Component
import BookingOption from '../booking/BookingOption';
import BookingContact from '../booking/BookingContact';
import BookingPayment from '../booking/BookingPayment';

const TourBookContent = (props) => {
  switch (props.activeStep) {
    case 0:
      return <BookingOption onChange={props.handleChange} submittedContent={props.submittedContent}/>;
    case 1:
      return <BookingContact onChange={props.handleChange} submittedContent={props.submittedContent}/>;
    case 2:
      return <BookingPayment onChange={props.handleChange} tour={props.tour} submittedContent={props.submittedContent}/>
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

export default TourBookContent;
