import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Components
import Header from './page/Header';
import Body from './page/Body';

// Style
import { withStyles } from 'material-ui/styles';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.test}>
        <Header />
        <Body />
      </div>
    )
  }
}

const styles = theme => ({
    test: {
        color: 'red'
    }
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(connect(mapStateToProps)(App));