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
import TourCard from './TourCard';

// Store
import { fetchInitialTours } from './action';

class Body extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
    this.props.dispatchFetchInitialTours()
  }

  render() {
    const { classes, tours } = this.props
    const isMobile = this.props.width < breakpoints['md'];
    return (
      <div className={classes.bodyWrapper} id='tours'>
        <Grid container spacing={16} className={classes.tourWrapper}>
          { tours && tours.map(tour => (
            <Grid item xs={12} sm={6} md={4} key={tour.id}>
              <TourCard tour={tour} />
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }
}

const styles = theme => ({
  bodyWrapper: {
    padding: '5%',
    flexGrow: 1,
  },
  filterWrapper: {
    marginLeft: 24
  },
  [`@media (min-width: ${breakpoints['md']}px)`]:{
    bodyWrapper: {
      display: 'flex',
      padding: '5% 10%',
      flexDirection: 'row',
    },
    tourWrapper: {
      // width: '75%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'stretch',
    },
  },
});

const mapStateToProps = (state, ownProps) => {
  const { tours } = state.ToursReducer.InitialToursReducer
  return { tours }
}

const mapDispatchToProps = (dispatch) => ({
    dispatchFetchInitialTours: () => dispatch(fetchInitialTours())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(widthWidth(withStyles(styles)(Body)));