import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import widthWidth from '../utils/withWidth';
import breakpoints from '../theme/breakpoints';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

// Component
import Tour from '../tour/Tour';

// Images
import getTours from '../utils/getTours';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tours: [],
      images: []
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
    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <div className={classes.bodyWrapper}>
        <Grid container spacing={0} className={classes.tourWrapper}>
          { tours && tours.map(tour => (
            <Tour key={tour.id} tour={tour}/>
          ))}
        </Grid>
        { !isMobile ? 
        <div className={classes.filterWrapper}>
          <Paper className={classes.paper}>Filter</Paper>
        </div>
        :
        null
        }
      </div>
    )
  }
}

const styles = theme => ({
  bodyWrapper: {
    padding: '2%',
    flexGrow: 1,
  },
  [`@media (min-width: ${breakpoints['md']}px)`]:{
    tourWrapper: {
      width: '75%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'stretch',
    }
  },
  filterWrapper: {
    marginLeft: 24
  },
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default widthWidth(withStyles(styles)(Body));