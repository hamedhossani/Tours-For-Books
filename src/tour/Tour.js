import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

// Component

class Tour extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, tour } = this.props
    return (
      <Grid item sm={12} md={6} >
        <Paper className={classes.paper}>{tour.name}</Paper>
      </Grid>
    )
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Tour));