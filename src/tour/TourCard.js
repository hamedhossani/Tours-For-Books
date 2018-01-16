import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import TourCardMediaContent from './TourCardMediaContent';

// Style
import breakpoints from '../theme/breakpoints';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemText,
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import ShareIcon from 'material-ui-icons/Share';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Tooltip from 'material-ui/Tooltip';

// Image
import MaterialIcon from '../utils/MaterialIcon';

// Component
import ActionButton from '../utils/ActionButton';

const styles = theme => ({
  card: {
    maxWidth: '100%',
    position: 'relative'
  },
  cardHeader: {
    position: 'relative',
    minHeight: 340,
    [`@media (min-width: ${breakpoints['md']}px)`]:{
      minHeight: 400,
    }
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  contactButton: {
    marginLeft: '16px',
  },
  price: {
    display: 'flex',
    marginLeft: '16px',
    '& h1 + h1':{
      marginLeft: theme.spacing.unit
    }
  },
  shareButton: {
    color: 'white',
    position: 'absolute',
    top: '3px',
    right: '3px'
  },
  tag: theme.custom.tag,
  topLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
  }
});

class TourCard extends Component {
  constructor(props) {
    super(props);
    this.state={
      expanded: false
    }
    this.handleExpandClick = this.handleExpandClick.bind(this)
  }
  handleExpandClick(){
    this.setState({ expanded: !this.state.expanded });
  };
  render() {
    const { classes, tour } = this.props;
    return (
      <Card className={classes.card}>
        <div className={classes.cardHeader}>
          <TourCardMediaContent tour={tour}/>
          <CardActions disableActionSpacing>
            { tour.type === 'local' ? 
              <div className={classes.price}>
                <Typography type='display2'>${tour.price.amount}</Typography>
                <Typography type='display1'>${tour.price.discountAmount}</Typography>
              </div>
              :
              <div className={classes.contactButton}>
                <Tooltip title='Email: inquiry@vietnamtoursforbooks.com'>
                  <div>
                    <ActionButton 
                      variant='primary'
                      onClick={this.handleBooking}>
                      Contact Us
                    </ActionButton>
                  </div>
                </Tooltip>
              </div>
            }
            <div className={classes.flexGrow} />
            <IconButton onClick={this.handleExpandClick} color='primary'>
              {this.state.expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </CardActions>
        </div>
        <Divider light />
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <List>
              { tour.highlights.map(hl => (
              <ListItem disableGutters key={hl.icon}>
                <ListItemAvatar>
                  <MaterialIcon iconName={hl.icon} />
                </ListItemAvatar>
                <ListItemText
                  primary={hl.name}
                >
                </ListItemText>
              </ListItem>
              ))}
            </List>
          </CardContent>
        </Collapse>
        {/**<IconButton className={classes.shareButton} aria-label="Share">
          <ShareIcon />
        </IconButton>
        **/}
        { tour.boughts > 0 ?
          <div className={[classes.tag, classes.topLeft].join(' ')}><Typography type='body2'>{tour.boughts}+ bought</Typography></div>  
          :
          ''
        }
      </Card>
    )
  }
}

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(TourCard);