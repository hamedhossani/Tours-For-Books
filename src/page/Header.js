import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

// Image
import heroImage from '../images/central_tour.jpg';
import logo from '../images/logo.png';

// Component
import Search from '../search/Search';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <div className={classes.heroWrapper}>
            <div className={classes.logo}></div>
            {/**<Typography type='headline' className={classes.heroText}>start your adventure today</Typography> **/}
            <h1 className={classes.heroText}>Hello! Our site is currently underconstruction. We will come back soon with an awesome website.</h1>
            <h3 className={classes.heroText}>Contact Us through <a href='https://www.facebook.com/toursforbooks/'>Facebook</a></h3>
            <Search />
        </div>
      </div>
    )
  }
}

const styles = theme => ({
    heroWrapper: {
        height: '100vh',
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '5%'
    },
    logo: {
        height: '150px',
        width: '150px',
        background: `url(${logo}) no-repeat`,
        backgroundSize: '120px 120px',
        backgroundPosition: '50% 50%',
        borderRadius: '50%',
        backgroundColor: 'white'
    },
    heroText: {
        fontFamily: "Open Sans",
        color: theme.palette.common.white,
        margin: '5% 0 2% 0',
        '&>a':{
          color: theme.palette.common.white,
        }
    }
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Header));