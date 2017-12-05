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
            <Typography type='headline' align='center' className={classes.heroText}>start your adventure today</Typography>
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
        color: theme.palette.common.white,
        '&>a':{
          color: theme.palette.common.white,
        }
    },
    [theme.breakpoints.down('sm')]: {
      logo: {
        height: '80px',
        width: '80px',
        backgroundSize: '70px'
      },
    },
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(Header);