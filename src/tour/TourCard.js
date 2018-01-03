import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import breakpoints from '../theme/breakpoints';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
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

// Image
import getImage from '../utils/getImage';
import MaterialIcon from '../utils/MaterialIcon';

const styles = theme => ({
  card: {
    maxWidth: '100%',
    position: 'relative'
  },
  media: {
    height: 200,
  },
  [`@media (min-width: ${breakpoints['md']}px)`]:{
    media: {
      height: 250
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
  flexGrow: {
    flex: '1 1 auto',
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
  tag: {
    opacity: 0.9,
    backgroundColor: theme.palette.secondary[500],
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    textTransform: 'uppercase',
    position: 'absolute',
    top: 0,
    left: 0
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
    let imgUrl = `https://storage.googleapis.com/bloggy-170620.appspot.com/tourImg/${tour.images[0]}.jpg`
    return (
      <Card className={classes.card}>
        <Link to={`/tour/${tour.id}`}>
          { imgUrl &&
          <CardMedia
            className={classes.media}
            image={imgUrl}
            title={tour.name}
          />
          }
          <CardContent>
            <Typography type='title'>
              {tour.name}
            </Typography>
            <Typography type='body1' component="p" align='justify'>
              {tour.description}
            </Typography>
          </CardContent>
        </Link>
        <CardActions disableActionSpacing>
          <div className={classes.price}>
            <Typography type='display2'>${tour.price.amount}</Typography>
            <Typography type='display1'>${tour.price.discountAmount}</Typography>
          </div>
          <div className={classes.flexGrow} />
          <IconButton onClick={this.handleExpandClick} color='primary'>
            {this.state.expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </CardActions>
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
          <div className={classes.tag}><Typography type='body2'>{tour.boughts}+ bought</Typography></div>  
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