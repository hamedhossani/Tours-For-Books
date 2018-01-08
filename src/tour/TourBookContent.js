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
      return <BookingOption onChange={props.handleChange} date={props.date} numberOfPax={props.numberOfPax} note={props.note}/>;
    
    default:
      return <div></div>;
  }
}

export default TourBookContent;

// case 1:
//       return <BookingContact onChange={props.onChange} name={props.name} email={props.email} phone={props.phone}/>;
//     case 2:
//       return !props.isError?
//       <BookingPayment 
//         tour={props.tour} 
//         onSuccessPayment={props.onSuccessPayment} 
//         onErrorPayment={props.onErrorPayment}
//         submittedContent={props.submittedContent}
//         allowBookNow={props.allowBookNow}
//         activateBookNow={props.activateBookNow}
//         submitBookNow={props.submitBookNow}
//         />
//       :
//       <div>
//         <Typography>Oh no! Something went wrong. Please contact us at: </Typography>
//         <Typography color='primary'>inquiry@vietnamtoursforbooks.com</Typography>
//       </div>
//     case 3:
//       return <div>
//         <Typography>Hooray! Thank you for booking a tour with us. We are so excited to show you around.</Typography>
//         <Typography>Please check your email for confirmation.</Typography>
//         {/**TFB logo**/}
//       </div>