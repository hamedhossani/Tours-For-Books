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
import FilterDesktop from '../filter/FilterDesktop';

// Store
import { fetchInitialTours } from './action';

class Tours extends Component {
  constructor(props) {
    super(props);
    this.state={
      open: false,
      localTourOpen: false,
      customTourOpen: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }
  
  handleClick(){
    this.setState({open: true})
  }
  handleClose(){
    this.setState({open: false})
  }
  handleChange(tourType,checked){
    this.setState({ [tourType] : checked})
  }
  handleReset(){
    this.setState({localTourOpen: false, customTourOpen: false})
  }
  
  handleFilter(filterState) {
    this.setState(filterState)
  }
  
  componentWillMount(){
    this.props.dispatchFetchInitialTours()
  }

  render() {
    const { classes, tours } = this.props
    const isMobile = this.props.width < breakpoints['md'];
    const { open, localTourOpen, customTourOpen } = this.state
    return (
      <div className={classes.tourWrapper} id='tours'>
        <Grid container spacing={16} className={classes.tourWrapper}>
          { tours && tours.map((tour) => 
            ( ((localTourOpen && tour.type === 'local') || (customTourOpen && tour.type === 'custom') || (!localTourOpen && !customTourOpen))&& 
              <Grid item xs={12} sm={6} md={4} key={tour.id}>
                <TourCard tour={tour} />
              </Grid>
            )
          )}
        </Grid>
        {isMobile?
          ''
          :
          <FilterDesktop 
            open={open} localTourOpen={localTourOpen} customTourOpen={customTourOpen}
            handleClick={this.handleClick} handleClose={this.handleClose} handleChange={this.handleChange} handleReset={this.handleReset}
          />
        }
      </div>
    )
  }
}

const styles = theme => ({
  tourWrapper: {
    padding: '5%',
    flexGrow: 1,
  },
  filterWrapper: {
    marginLeft: 24
  },
  [`@media (min-width: ${breakpoints['md']}px)`]:{
    tourWrapper: {
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
)(widthWidth(withStyles(styles)(Tours)));