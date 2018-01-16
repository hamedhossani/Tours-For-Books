import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import breakpoints from '../theme/breakpoints';
import { withStyles } from 'material-ui/styles';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';

// Component
import MaterialIcon from '../utils/MaterialIcon';
import FilterForm from './FilterForm';

const styles = theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing.unit*3,
    right: theme.spacing.unit*3
  }
});

class FilterDesktop extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, open, localTourOpen, customTourOpen, handleClick, handleClose, handleChange, handleReset } = this.props;
    return (
      <div className={classes.root}> 
        <Tooltip id="tooltip-icon" title="Filter">
          <IconButton onClick={handleClick}>
            <MaterialIcon iconName='FilterList' />
          </IconButton>
        </Tooltip>
        <FilterForm 
          open={open} 
          handleClose={handleClose} handleChange={handleChange} handleReset={handleReset}
          localTourOpen={localTourOpen} customTourOpen={customTourOpen}/>
      </div>
    )
  }
}

export default withStyles(styles)(FilterDesktop);