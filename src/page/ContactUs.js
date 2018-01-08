import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

// Icon
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faEnvelope as fasEnvelope } from '@fortawesome/fontawesome-free-solid';
import { faFacebook as fasFacebook,
          faTwitter as fasTwitter,
          faWhatsapp as fasWhatsapp
} from '@fortawesome/fontawesome-free-brands';

class ContactUs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Typography type='display4' color='primary'>Let's Connect!</Typography>
        <Grid container spacing={0}>
          <Grid item xs={12} md={4} className={classes.contactItem}>
            <FontAwesomeIcon icon={fasEnvelope} size="lg" style={{color: '#FF632B'}}/>
            <Typography type='body1'>inquiry@vietnamtoursforbooks.com</Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <a href='https://www.facebook.com/toursforbooks' className={classes.contactItem} target='_blank'>
              <FontAwesomeIcon icon={fasFacebook} style={{color: '#3b5998'}} size="lg"/>
              <Typography type='body1' className={classes.alignCenter}>toursforbooks</Typography>
            </a>
          </Grid>
          <Grid item xs={12} md={2}>
            <a href='https://twitter.com/toursforbooks' className={classes.contactItem} target='_blank'>
              <FontAwesomeIcon icon={fasTwitter}style={{color: '#1da1f2'}} size="lg"/>
              <Typography type='body1'>@toursforbooks</Typography>
            </a>
          </Grid>
          <Grid item xs={12} md={4}>
            <a href='https://api.whatsapp.com/send?phone=84986894714' className={classes.contactItem} target='_blank'>
              <FontAwesomeIcon icon={fasWhatsapp} style={{color: '#25d366'}} size="lg"/>
              <Typography type='body1'>+84 98 6894714 (WhatsApp/Zalo)</Typography>
            </a>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '5%',
    textAlign: 'center'
  },
  contactItem: {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px 0px',
    '& p': {
      marginLeft: 5
    }
  },
  alignCenter: {
    textAlign: 'center'
  },
  accentColor: {
    backgroundColor: theme.palette.secondary[500],
    color: theme.palette.common.white
  }
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(ContactUs);