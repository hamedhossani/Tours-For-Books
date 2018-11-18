import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from '@material-ui/core/styles';
import breakpoints from '../theme/breakpoints';
import widthWidth from '../utils/withWidth';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//Components
import TourImage from './TourImage';
import TourItineraryMobile from './TourItineraryMobile';
import TourItinerary from './TourItinerary';

class TourDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, tour } = this.props
    const isMobile = this.props.width < breakpoints['md'];
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <TourImage tourImgs={tour.images} />
          <div className={classes.topLeft}>
            <Typography type='body2' className={classes.tag}>+{tour.boughts} boughts</Typography>
            <Typography type='display4'>{tour.name}</Typography>  
          </div>
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
    position: 'relative',
    '& >h2, h1': {
      color: 'white'
    }
  },
  topLeft: {
    position: 'absolute',
    top: '5%',
    left: '5%' 
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