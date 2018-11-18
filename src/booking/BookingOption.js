import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';

class BookingOption extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    e.preventDefault()
    this.props.onChange({ type: 'option', fields: {[e.target.name]: e.target.value }})
  }
  render() {
    const { classes } = this.props
    const { date, numberOfPax, note }  = this.props.submittedContent
    return (
      <FormGroup className={classes.root}>
        <TextField
          type='date'
          name='date'
          helperText='departure date'
          value={date}
          className={classes.textField}
          onChange={this.handleChange}
          required
        />
        <TextField
          name='numberOfPax'
          type='number'
          value={numberOfPax}
          placeholder='Number of travellers'
          label='Number of travellers'
          helperText='include adults and children'
          className={classes.textField}
          onChange={this.handleChange}
          required
        />
        <TextField
          name='note'
          type='textarea'
          value={note}
          placeholder='Other requests'
          label='Other requests'
          helperText='hotel standard, special interest, etc.'
          multiline
          rowsMax='4'
          fullWidth
          className={classes.textField}
          onChange={this.handleChange}
        />
      </FormGroup>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
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

export default withStyles(styles)(BookingOption);