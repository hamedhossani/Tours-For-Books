import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import update from 'react-addons-update';

// Style
import breakpoints from '../theme/breakpoints';
import { withStyles } from 'material-ui/styles';
import MobileStepper from 'material-ui/MobileStepper';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

// Image
import getImage from '../utils/getImage';

class TourImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      imgUrls:[]
    };
    this.handleBack = this.handleBack.bind(this)
    this.handleNext = this.handleNext.bind(this)
  }
  handleNext(){
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack(){
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };
  
  componentWillMount(){
    
  }

  render() {
    const { classes, theme, tourImgs } = this.props
    const { activeStep } = this.state
    return (
      <div className={classes.root}>
        {tourImgs.map((img,index) => {
          let imgUrl = `https://storage.googleapis.com/bloggy-170620.appspot.com/tourImg/${img}.jpg`
          return (
            activeStep === index &&
            <div key={index} style={{backgroundImage: `url(${imgUrl})`}} className={classes.tourImg}></div>
          )
        })}
        <MobileStepper
          type="dots"
          steps={tourImgs.length}
          position="static"
          activeStep={this.state.activeStep}
          className={classes.stepper}
          nextButton={
            <IconButton color='contrast' aria-label="Next" onClick={this.handleNext} disabled={this.state.activeStep === tourImgs.length-1}>
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
          }
          backButton={
            <IconButton color='contrast' aria-label="Back" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
          }
        />
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  stepper: {
    width: '50%',
    right: 0,
    bottom: 0,
    position: 'absolute',
    marginRight: '25%',
    borderRadius: 27,
    marginBottom: theme.spacing.unit
  },
  tourImg: {
    height: 400,
    backgroundSize: 'cover'
  },
  [`@media (max-width: ${breakpoints['sm']}px)`]:{ 
    tourImg: {
      height: 250,
    }
  }
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles, { withTheme: true })(TourImage);