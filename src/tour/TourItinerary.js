import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import update from 'react-addons-update';

// Style
import breakpoints from '../theme/breakpoints';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import MaterialIcon from '../utils/MaterialIcon';

class TourImage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes, tour, activities } = this.props
    return (
      <div>
        {activities.map((activity, index) => (
          <Grid container spacing={24} key={index} className={classes.activityRoot}>
            <Grid item xs={12} sm={2}>
              <Typography type='subheading'>{activity.time}</Typography>
            </Grid>
            <Grid item xs={12} sm={10} className={classes.activityByNameWrapper}>
              {activity.icon.map((item,index)=> (
                <MaterialIcon key={index} iconName={item} />
              ))}
              <Typography type='subheading' className={classes.activityName}>{activity.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={2} className={classes.activityBy}>
              {activity.by && <MaterialIcon iconName={activity.by} />}
            </Grid>
            {activities.length-1!==index?
            <Grid item xs={12} sm={9} className={classes.activityNoteWrapper}>
              <Typography type='body1' className={classes.activityNote} >{activity.note}</Typography>
            </Grid>
            :
            <Grid item xs={12} sm={9}></Grid>}
          </Grid>    
        ))}
        
      </div>
    )
  }
}

const styles = theme => ({
  activityRoot: {
    marginTop: theme.spacing.unit,
    alignItems: 'center',
  },
  activityByNameWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& div + div': {
      marginLeft: theme.spacing.unit
    }
  },
  activityName:{
    marginLeft: theme.spacing.unit,
    textTransform: 'capitalize'
  },
  activityNoteWrapper: {
    marginLeft: '32px',
    borderLeft: `1px solid ${theme.palette.common.dardGrey}`,
  },
  activityNote: {
    paddingLeft: '16px',
    paddingBottom: '20px'
  }
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(TourImage);