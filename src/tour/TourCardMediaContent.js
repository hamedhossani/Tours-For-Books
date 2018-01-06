import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import widthWidth from '../utils/withWidth';
import breakpoints from '../theme/breakpoints';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { CardContent, CardMedia } from 'material-ui/Card';
import Dialog, {
  DialogActions,
  DialogContent,
  withMobileDialog,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import ForwardIcon from 'material-ui-icons/ArrowForward';
import ShareIcon from 'material-ui-icons/Share';

// Components
import TourDetail from './TourDetail';
import TourBook from './TourBook';
import ActionButton from '../utils/ActionButton';

const styles = theme => ({
  media: {
    height: 150,
  },
  [`@media (min-width: ${breakpoints['md']}px)`]:{
    media: {
      height: 200
    }
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
      paddingLeft: '0.2em',
      lineHeight: '1.3em',
      backgroundColor: 'white',
      color: 'black',
      [`@media (min-width: ${breakpoints['sm']}px)`]:{
        lineHeight: '0.8em',
      }
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
  dialog: {
    [`@media (max-width: ${breakpoints['sm']}px)`]:{
      marginTop: 40,
      height: '90%'
    }
  },
  hiddenScrollX: {
    [`@media (min-width: ${breakpoints['md']}px)`]:{
      '& >div' : {
        overflowX: 'hidden'
      }
    }
  },
  hiddenScrollY: {
    [`@media (min-width: ${breakpoints['md']}px)`]:{
      marginRight: -18,
    }
  },
  topRight: {
    position: 'absolute',
    top: 15,
    right: 15,
    '& div + div':{
      marginLeft: theme.spacing.unit * 2
    }
  },
  backDialogButton: {
    transform: 'rotate(180deg)'
  },
  closeDialogButton: {
    backgroundColor: theme.palette.common.lightWhite,
    color: theme.palette.common.darkGrey,
  },
  bookNowButton:{
    position: 'absolute',
    top: 0,
    right: -100
  },
  price: {
    display: 'flex',
    marginLeft: '16px',
    '& h1 + h1':{
      marginLeft: theme.spacing.unit
    }
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class TourCardMediaContent extends Component {
  constructor(props) {
    super(props);
    this.state={
      open: false,
      booking: false
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleBooking = this.handleBooking.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  handleClickOpen(){
    this.setState({ open: true });
  };

  handleClose(){
    this.setState({ open: false });
  };
  
  handleBooking() {
    this.setState({ booking: true });
  }
  
  handleBack() {
    this.setState({ open: true, booking: false });
  }
  
  handleCancel() {
    this.setState({ booking: false });
  }
  render() {
    const { classes, tour, fullScreen } = this.props;
    let imgUrl = `https://storage.googleapis.com/bloggy-170620.appspot.com/tourImg/${tour.images[0]}.jpg`
    return (
      <div>
        <div onClick={this.handleClickOpen}>
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
        </div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          transition={Transition}
          keepMounted
          aria-labelledby="responsive-dialog-title"
          onClick={this.handleClose}
          className={[classes.dialog, classes.hiddenScrollX].join(' ')}
        >
          <DialogContent className={classes.hiddenScrollY} >
            <TourDetail tour={tour}/>
          </DialogContent>
          <div className={classes.topRight}>
            <IconButton className={classes.closeDialogButton} onClick={this.handleClose}><CloseIcon />
            </IconButton>
          </div>
          <DialogActions>
            <div className={classes.price}>
              <Typography type='display2'>${tour.price.amount}</Typography>
              <Typography type='display1'>${tour.price.discountAmount}</Typography>
            </div>
            <ActionButton 
              variant='primary'
              onClick={this.handleBooking}>
              Book Now
            </ActionButton>
          </DialogActions>
        </Dialog>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.booking}
          transition={Transition}
          keepMounted
          aria-labelledby="responsive-dialog-title"
          className={[classes.dialog, classes.hiddenScrollX].join(' ')}
        >
          <DialogContent className={classes.hiddenScrollY}>
            <TourBook tour={tour}/>
          </DialogContent>
          <div className={classes.topRight}>
            <IconButton className={classes.backDialogButton} onClick={this.handleBack}><ForwardIcon />
            </IconButton>
            <IconButton className={classes.closeDialogButton} onClick={this.handleCancel}><CloseIcon />
            </IconButton>
          </div>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default  withMobileDialog()(widthWidth(withStyles(styles)(TourCardMediaContent)));