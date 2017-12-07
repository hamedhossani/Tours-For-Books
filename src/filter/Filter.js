import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import breakpoints from '../theme/breakpoints';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';

const styles = theme => ({
  
});

class Tour extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div></div>
    )
  }
}

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(Tour);