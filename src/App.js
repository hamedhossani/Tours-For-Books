import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Components
import InitPage from './page/InitPage';
import TourPage from './tour/TourPage';

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
        <Route exact path='/' render={(props)=><InitPage routing={props}/>}/>
        <Route exact path='/tour/:tour_id' render={(props)=><TourPage routing={props}/>}/>
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

export default withStyles(styles)(App);