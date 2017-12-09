import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

// Component
// import Calendar from 'react-calendar-material';

class BookingOption extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props
    return (
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          type="date"
          placeholder="mm/dd/yyyy"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    )
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(BookingOption);