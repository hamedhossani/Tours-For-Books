import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

// Component
import Tour from '../tour/Tour';

// Images
import getTours from '../utils/getTours';
import * as firebase from 'firebase';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tours: []
    }
  }
  componentDidMount(){
    getTours.list().once('value').then((tours) => {
      this.setState({tours: tours.val()});
    })
  }

  render() {
    const { classes } = this.props
    const { tours } = this.state
    return (
      <div className={classes.bodyWrapper}>
        <Grid container spacing={24} className={classes.tourWrapper}>
          { tours && tours.map(tour => (
            <Tour key={tour.id} tour={tour}/>
          ))}
        </Grid>
        {/** Filter wrapper will be different in mobile**/}
        <div className={classes.filterWrapper}>
          <Paper className={classes.paper}>Filter</Paper>
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  bodyWrapper: {
    padding: '5%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'stretch'
  },
  tourWrapper: {
    width: '75%'
  },
  filterWrapper: {
    marginLeft: 24
  }
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(Body);