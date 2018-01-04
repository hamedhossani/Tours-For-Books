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

// Style
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props
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
      </div>
    )
  }
}

const styles = theme => ({
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(App);