import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import widthWidth from '../utils/withWidth';
import breakpoints from '../theme/breakpoints';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

// Components
import Search from '../search/Search';
import TourImage from './TourImage';
import TourDetail from './TourDetail';
import TourBook from './TourBook';

// Store
import { fetchOneTourById } from './action';

class TourPage extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
    const tour_id = this.props.routing.match.params.tour_id
    this.props.dispatchFetchOneTour(tour_id)
  }

  render() {
    const { classes } = this.props
    const { tour, isFetching } = this.props
    return (
      <div >
        <Search />
        {!isFetching? 
        <div className={classes.root}>
          <Typography type='display3'>{tour.name}</Typography>
          {/** Tour Review Summary**/}
          <Grid container spacing={24}>
            <Grid item xs={12} md={8}>
              <TourImage tourImgs={tour.images}/>
              <TourDetail tour={tour}/>
            </Grid>
            <Grid item xs={12} md={4}>
              <TourBook />
            </Grid>
          </Grid>
        </div>
        :''}
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
    padding: '0 2% 0 2%' 
  },
  [`@media (min-width: ${breakpoints['md']}px)`]:{
    root: {
      padding: '0 8% 0 8%'
    }
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const mapStateToProps = (state, ownProps) => {
  const { tour, isFetching }  = state.ToursReducer.CurrentToursReducer
  return { tour, isFetching }
}

const mapDispatchToProps = (dispatch) => ({
    dispatchFetchOneTour: (id) => dispatch(fetchOneTourById(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(widthWidth(withStyles(styles)(TourPage)));