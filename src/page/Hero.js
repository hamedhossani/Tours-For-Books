import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

// Image
import heroImage from '../images/central_tour.jpg';

class Hero extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    let logoImgUrl = `https://storage.googleapis.com/bloggy-170620.appspot.com/appImg/logo.png`
    return (
      <div>
        <div className={classes.heroWrapper}>
            <div className={classes.logo} style={{backgroundImage: `url(${logoImgUrl})`}}></div>
            <Typography type='headline' align='center' className={classes.heroText}>start your adventure today</Typography>
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
        backgroundRepeat: 'no-repeat',
        backgroundSize: '80% 80%',
        backgroundPosition: '50% 50%',
        borderRadius: '50%',
        backgroundColor: 'white',
    },
    heroText: {
      marginBottom: theme.spacing.unit * 3,
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

export default withStyles(styles)(Hero);