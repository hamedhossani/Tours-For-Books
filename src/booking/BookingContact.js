import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import FacebookLogin from 'react-facebook-login';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import { FormGroup } from 'material-ui/Form';

class BookingContact extends Component {
  constructor(props) {
    super(props);
    this.state={
      authorized: false,
      name: '',
      email: ''
    }
    this.responseFacebook = this.responseFacebook.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFbInfo = this.handleFbInfo.bind(this)
  }
  
  handleChange(e) {
    e.preventDefault()
    this.props.onChange({ [e.target.name]: e.target.value })
  }
  
  handleFbInfo(name, email) {
    this.props.onChange({ name, email })
  }
  
  responseFacebook(res){
    const { name, email } = res
    if (name && email) {
      this.setState({ authorized: true, name, email})
      this.handleFbInfo( name, email)
    } else {
      console.log("Login not successful")
    }
  }
  render() {
    const { classes } = this.props
    const { authorized, name, email } = this.state
    return (
      <div>
        { authorized? 
          <Typography type='body1'>You are logged in as {name}. We will send the tour confirmation to {email}. </Typography>
          :
          <div>
            <div className={classes.container}>
              <FacebookLogin
                appId="133018877378513"
                autoLoad={true}
                fields="name,email,picture"
                textButton='using facebook'
                callback={this.responseFacebook} 
                size="small"/>
              {/**Google Login**/}
            </div>
            <div></div>
            <Divider light />
            <FormGroup className={classes.container} noValidate>
              <TextField
                type='text'
                label='Full Name'
                name='name'
                className={classes.textField}
                onChange={this.handleChange}
                required
              />
              <TextField
                type='tel'
                label='Phone Number'
                name='phone'
                onChange={this.handleChange}
                className={classes.textField}
                required
              />
              <TextField
                type='email'
                label='Email'
                name='email'
                onChange={this.handleChange}
                className={classes.textField}
                required
              />
            </FormGroup>
          </div>
        }
      </div>
    )
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  textField: {
    marginBottom: theme.spacing.unit * 3,
    width: 200,
  },
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(BookingContact);