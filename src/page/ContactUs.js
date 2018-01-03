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
        <Grid container spacing={0} style={{width: '60%'}}>
          <Grid item xs={12} md={4}>
            <a href='https://www.facebook.com/toursforbooks' className={classes.contactItem} target='_blank'>
              <FontAwesome name='facebook' size='2x' style={{color: '#3b5998'}}/>
              <Typography type='body1' className={classes.alignCenter}>toursforbooks</Typography>
            </a>
          </Grid>
          <Grid item xs={12} md={4}>
            <a href='https://twitter.com/toursforbooks' className={classes.contactItem} target='_blank'>
              <FontAwesome name='twitter' size='2x' style={{color: '#1da1f2'}} />
              <Typography type='body1'>@toursforbooks</Typography>
            </a>
          </Grid>
          <Grid item xs={12} md={4}>
            <a href='https://api.whatsapp.com/send?phone=84986894714' className={classes.contactItem} target='_blank'>
              <FontAwesome name='whatsapp' size='2x' style={{color: '#25d366'}} />
              <Typography type='body1'>+84 98 6894714</Typography>
            </a>
          </Grid>
        </Grid>
        <Grid>
          <Grid item xs={12} md={12} className={classes.contactItem}>
            <EmailIcon color='accent'/>
            <Typography type='body1'>inquiry@vietnamtoursforbooks.com</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <a href='https://www.google.com/maps/dir/47.6163436,-122.2009099/Better+Life+Vietnam,+3,+L%C3%BD+Th%C6%B0%E1%BB%9Dng+Ki%E1%BB%87t,+Ph%C3%BA+La,+H%C3%A0+%C4%90%C3%B4ng,+H%C3%A0+N%E1%BB%99i,+Vietnam/@28.6075708,134.8966891,3z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x313452db8c8ae00d:0x7256c60f4a033fa1!2m2!1d105.7649123!2d20.961778' className={classes.contactItem} target='_blank'>
              <FontAwesome name='map-marker' size='2x' style={{color: '#189AB4'}} />
              <Typography type='body1' className={classes.alignCenter}>3 Lý Thường Kiệt, Phú La, Hà Đông, Hanoi, Vietnam</Typography>
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