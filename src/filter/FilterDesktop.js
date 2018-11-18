import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import breakpoints from '../theme/breakpoints';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// Component
import MaterialIcon from '../utils/MaterialIcon';
import FilterForm from './FilterForm';

const styles = theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing.unit*10,
    [`@media (min-width: ${breakpoints['md']}px)`]:{
      bottom: theme.spacing.unit*3,
    },
    right: theme.spacing.unit*3,
    zIndex: 1000,
  },
});

class FilterDesktop extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, open, localTourOpen, customTourOpen, handleClick, handleApply, handleChange, handleReset } = this.props;
    return (
      <div className={classes.root}> 
        <Tooltip id="tooltip-icon" title="Filter" open={true}>
          <IconButton onClick={handleClick}>
            <MaterialIcon iconName='FilterList' />
          </IconButton>
        </Tooltip>
        <FilterForm 
          open={open} 
          handleApply={handleApply} handleChange={handleChange} handleReset={handleReset}
          localTourOpen={localTourOpen} customTourOpen={customTourOpen}/>
      </div>
    )
  }
}

export default withStyles(styles)(FilterDesktop);