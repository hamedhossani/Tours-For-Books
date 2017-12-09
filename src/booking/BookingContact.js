import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import FacebookLogin from 'react-facebook-login';

class BookingContact extends Component {
  constructor(props) {
    super(props);
    this.state={
      authorized: false,
      name: ''
    }
    this.componentClicked = this.componentClicked.bind(this)
    this.responseFacebook = this.responseFacebook.bind(this)
  }
  
  componentClicked(){
    console.log('clicked')
  }
  
  responseFacebook(res){
    if (res.name && res.email) {
      this.setState({ authorized: true, name: res.name})
    } else {
      console.log("Login not successful")
    }
  }
  render() {
    const { classes } = this.props
    const { authorized, name } = this.state
    return (
      <div>
        { authorized? 
          <Typography type='body1'>You are logged in as {name}</Typography>
          : 
          <FacebookLogin
            appId="133018877378513"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook} 
            size="medium"/>
        }
      </div>
    )
  }
}

const styles = theme => ({
  
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(BookingContact);