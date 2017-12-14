import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

// Icon
var FontAwesome = require('react-fontawesome');
import EmailIcon from 'material-ui-icons/Email';
import IconButton from 'material-ui/IconButton';

class ContactUs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Typography type='headline' color='primary'>Contact Us</Typography>
        <Grid container spacing={0}>
          <Grid item xs={12} md={3} className={classes.contactItem}>
            <IconButton className={classes.accentColor}><EmailIcon /></IconButton>
            <Typography type='body1'>inquiry@vietnamtoursforbooks.com</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <a href='https://www.facebook.com/toursforbooks' className={classes.contactItem} target='_blank'>
              <FontAwesome name='facebook-square' size='2x' style={{color: '#3b5998'}}/>
              <Typography type='body1' className={classes.alignCenter}>toursforbooks</Typography>
            </a>
          </Grid>
          <Grid item xs={12} md={3}>
            <a href='https://twitter.com/toursforbooks' className={classes.contactItem} target='_blank'>
              <FontAwesome name='twitter' size='2x' style={{color: '#1da1f2'}} />
              <Typography type='body1'>@toursforbooks</Typography>
            </a>
          </Grid>
          <Grid item xs={12} md={3}>
            <a href='https://api.whatsapp.com/send?phone=84986894714' className={classes.contactItem} target='_blank'>
              <FontAwesome name='whatsapp' size='2x' style={{color: '#25d366'}} />
              <Typography type='body1'>+84 98 6894714 (WhatsApp/ Zalo)</Typography>
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
    textAligns: 'center'
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