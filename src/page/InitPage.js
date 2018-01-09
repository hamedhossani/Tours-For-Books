import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Components
import Hero from './Hero';
import Tours from '../tour/Tours';
import WhyChooseUs from './WhyChooseUs';
import AboutUs  from './AboutUs';
import ContactUs from './ContactUs';
import Footer from './Footer';
import Message from '../utils/Message';

// Style
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';

// Store
import { fetchCloseMessage } from './action';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props
    const { message, messageOpen, dispatchCloseMessage } = this.props
    return (
      <div>
        <Hero />
        <Tours />
        <Divider />
        <WhyChooseUs />
        <Divider />
        <AboutUs />
        <Divider />
        <ContactUs />
        <Footer />
        <Message
          message={message}
          messageOpen={messageOpen}
          handleCloseMessage={(event, reason) => dispatchCloseMessage(event, reason)}
        />
      </div>
    )
  }
}

const styles = theme => ({
});

const mapStateToProps = (state, ownProps) => {
  const {  message, messageOpen }  = state.MessageReducer.CurrentMessageReducer
  return {  message, messageOpen }
}
const mapDispatchToProps = (dispatch) => ({
    dispatchCloseMessage: (event, reason) => dispatch(fetchCloseMessage(event, reason))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));