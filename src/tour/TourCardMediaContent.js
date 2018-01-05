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
  DialogContent,
  withMobileDialog,
} from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import ShareIcon from 'material-ui-icons/Share';

// Components
import TourDetail from './TourDetail';

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
  closeDialogButton: {
    backgroundColor: theme.palette.common.lightWhite,
    color: theme.palette.common.darkGrey,
    position: 'absolute',
    top: 15,
    right: 15
  }
});

class TourCardMediaContent extends Component {
  constructor(props) {
    super(props);
    this.state={
      open: false
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  handleClickOpen(){
    this.setState({ open: true });
  };

  handleClose(){
    this.setState({ open: false });
  };
  render() {
    const { classes, tour, fullScreen } = this.props;
    const isMobile = this.props.width < breakpoints['md'];
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
          aria-labelledby="responsive-dialog-title"
          onClick={this.handleClose}
        >
          <DialogContent>
            <TourDetail tour={tour}/>
          </DialogContent>
          <IconButton className={classes.closeDialogButton} onClick={this.handleClose}><CloseIcon />
          </IconButton>
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