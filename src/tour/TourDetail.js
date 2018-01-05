import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import SupportTouch from '../utils/SupportTouch';

// Style
import { withStyles } from 'material-ui/styles';
import breakpoints from '../theme/breakpoints';
import widthWidth from '../utils/withWidth';
import Typography from 'material-ui/Typography';
import MaterialIcon from '../utils/MaterialIcon';
import List, { ListItem, ListItemText } from 'material-ui/List';

//Components
import TourItineraryMobile from './TourItineraryMobile';
import TourItinerary from './TourItinerary';

class TourDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, tour } = this.props
    const isMobile = this.props.width < breakpoints['md'];
    let imgUrl = `https://storage.googleapis.com/bloggy-170620.appspot.com/tourImg/${tour.images[0]}.jpg`
    return (
      <div className={classes.root}>
        <div className={classes.header}
              style={{backgroundImage: `url(${imgUrl})`}}>
          <Typography type='body2' className={classes.tag}>+{tour.boughts} boughts</Typography>
          <Typography type='display4'>{tour.name}</Typography>    
        </div>
        <div className={classes.section}>
          <Typography type='title'>Summary</Typography>
          <Typography type='body1'>{tour.description}</Typography>
        </div>
        <div className={classes.section}>
          <Typography type='title'>Itinerary</Typography>
          { isMobile ? 
            <TourItineraryMobile tour={tour} activities={tour.activities} />
            :
            <TourItinerary tour={tour} activities={tour.activities}/>
          }
        </div>
        <div className={classes.section}>
          <Typography type='title'>What's Included</Typography>
          <List>
            { tour.includes.map((item,i) => (
              <ListItem button key={i}>
                <ListItemText
                  primary={item}
                />
              </ListItem>
            ))}
          </List>
        </div>
        <div className={classes.section}>
          <Typography type='title'>Excluded Fee</Typography>
          <List>
            { tour.excludes.map((item,i) => (
              <ListItem button key={i}>
                <ListItemText
                  primary={item}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  header: {
    height: '62vh',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    padding: '5%',
    '& >h2, h1': {
      color: 'white'
    }
  },
  [`@media (min-width: ${breakpoints['md']}px)`]:{
    header: {
      height: '38vh'
    }
  },
  tag: theme.custom.tag,
  section: {
    padding: '5%',
    paddingBottom: 0,
    '& p':{
      lineHeight: 1.4,
      [`@media (max-width: ${breakpoints['sm']}px)`]:{
        fontSize: '1.2rem',
      }
    }
  },
  swipeContainer: {
    padding: '0 18px',
    '& >div >div':{
      padding: '0 8px'
    }
  },
  slide: {
    padding: theme.spacing.unit,
    paddingTop: 0,
    minHeight: '62vh',
    color: '#fff',
    marginTop: 40,
    border: '1px solid lightgrey',
    borderRadius: 10
  },
  activityIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    '& >div': {
      marginTop: -20,
      padding: `0 ${theme.spacing.unit}px`,
      backgroundColor: 'white'
    }
  },
  activityName: {
    textTransform: 'capitalize'
  },
  activityNote: {
    marginTop: theme.spacing.unit * 3,
    '& p': theme.typography.body1
  },
  centerAlign: {
    textAlign: 'center'
  }
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default widthWidth(withStyles(styles)(TourDetail));