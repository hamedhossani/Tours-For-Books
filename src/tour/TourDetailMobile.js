import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import SupportTouch from '../utils/SupportTouch';

// Style
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import MaterialIcon from '../utils/MaterialIcon';
import List, { ListItem, ListItemText } from 'material-ui/List';

class TourDetailMobile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, tour } = this.props
    let imgUrl = `https://storage.googleapis.com/bloggy-170620.appspot.com/tourImg/${tour.images[0]}.jpg`
    return (
      <div className={classes.root}>
        <div className={classes.header}
              style={{backgroundImage: `url(${imgUrl})`}}>
          <Typography type='body2'>+{tour.boughts} boughts</Typography>
          <Typography type='display4'>{tour.name}</Typography>    
        </div>
        <div className={classes.section}>
          <Typography type='title'>Summary</Typography>
          <Typography type='body1'>{tour.description}</Typography>
        </div>
        <div className={classes.section}>
          <Typography type='title'>Itinerary</Typography>
          <SupportTouch>
            <SwipeableViews className={classes.swipeContainer}>
              {tour.activities.map((activity, index) => (
                <div key={activity.name} className={classes.slide}>
                  <div className={classes.activityIcons}>
                    {activity.icon.map((item,index)=> (
                      <MaterialIcon key={index} iconName={item} />
                    ))}
                  </div>
                  <Typography type='body1' className={[classes.activityName, classes.centerAlign].join(' ')}>{activity.name}</Typography>
                  <Typography type='subheading' className={classes.centerAlign}>{activity.time}</Typography>
                  <div className={classes.activityNote}>
                    <Typography type='body1' className={classes.centerAlign} >{activity.note}</Typography>
                  </div>
                  
                </div>
              ))}
            </SwipeableViews>
          </SupportTouch>
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
  section: {
    padding: '5%',
    '& p':{
      fontSize: '1.2rem',
      lineHeight: 1.4
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

export default withStyles(styles)(TourDetailMobile);