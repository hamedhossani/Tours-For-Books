import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';

class TourBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: 0
    };
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event, value) {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props
    return (
        <div>Booking</div>
    )
  }
}

const styles = theme => ({
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(TourBook);