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
  cardHeader: {
    minHeight: 400,
    position: 'relative'
  },
  media: {
    height: 150,
  },
  [`@media (min-width: ${breakpoints['md']}px)`]:{
    media: {
      height: 200
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
  overflowText: {
    /* hide text if it more than N lines  */
    overflow: 'hidden',
    /* for set '...' in absolute position */
    position: 'relative', 
    /* use this value to count block height */
    lineHeight: '1.2em',
    /* max-height = line-height (1.2) * lines max number (3) */
    maxHeight: '3.6em', 
    /* fix problem when last visible word doesn't adjoin right side  */
    textAlign: 'justify',  
    /* place for '...' */
    marginRight: '-1em',
    paddingRight: '1em',
    '&:before': {
      /* points in the end */
      content: '\"...\"',
      /* absolute position */
      position: 'absolute',
      /* set position to right bottom corner of block */
      right: 0,
      bottom: 0,
      marginRight: '1em',
      lineHeight: '0.7em',
      backgroundColor: 'white',
      color: 'black'
    },
    /* hide ... if we have text, which is less than or equal to max lines */
    '&:after': {
      /* points in the end */
      content: '\"\"',
      /* absolute position */
      position: 'absolute',
      /* set position to right bottom corner of text */
      right: 0,
      /* set width and height */
      width: '1em',
      height: '1em',
      marginTop: '0.2em',
      /* bg color = bg color under block */
      background: 'white',
    },
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
        <div className={classes.cardHeader}>
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
              <div className={classes.overflowText}>
              <Typography type='body1' component="p" align='justify'>
                {tour.description}
              </Typography>
              </div>
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