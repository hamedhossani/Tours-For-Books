import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import update from 'react-addons-update';

// Style
import breakpoints from '../theme/breakpoints';
import { withStyles } from 'material-ui/styles';

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Pagination from '../utils/Pagination';
import SupportTouch from '../utils/SupportTouch';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

class TourImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
  }
  handleChangeIndex(index) {
    this.setState({
      index,
    });
  };

  render() {
    const { classes, theme, tourImgs } = this.props
    const { index } = this.state;
    return (
      <SupportTouch>
        <div style={styles.root}>
          <AutoPlaySwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
            {tourImgs.map((img,index) => {
              let imgUrl = `https://storage.googleapis.com/bloggy-170620.appspot.com/tourImg/${img}.jpg`
              return (
                <div key={index} style={{backgroundImage: `url(${imgUrl})`}} className={[classes.tourImg, classes.slide].join(' ')}></div>
              )
            })}
          </AutoPlaySwipeableViews>
          <Pagination dots={tourImgs.length} index={index} onChangeIndex={this.handleChangeIndex} />
        </div>
      </SupportTouch>
    )
  }
}

const styles = theme => ({
  root: {
    position: 'relative',
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
    height: '62vh',
    [`@media (min-width: ${breakpoints['md']}px)`]:{
      height: '38vh'
    }
  },
  tourImg: {
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