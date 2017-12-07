import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import LocationIcon from 'material-ui-icons/Room';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

// Component
import SearchSuggestion from './SearchSuggestion';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} aria-label="Menu">
              <LocationIcon />
            </IconButton>
            <SearchSuggestion />
            <Button color="contrast">Search</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    boxShadow: theme.shadows[2]
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    color: theme.palette.common.primary
  },
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(Search);