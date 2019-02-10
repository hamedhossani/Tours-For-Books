import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
  root: {
    // display: 'flex',
    // justifyContent: 'center',
    // flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

  class TourCategory extends React.Component {
    constructor(props) {
      super(props);
      this.state={
         color: 'default',
         active: 'none',
      }
    }    

    ChipColor(position) {
      if ( this.state.active === position) {
        return "primary";
      }
      return "default";
   }
  
    toggle(position){
      if (this.state.active === position) {
        this.setState({active : null})
      } else {
        this.setState({active : position})
      }
      // console.log(this.state.active);
      this.props.handleCategory(this.state.active);
  }

  render  (){
    const { classes } = this.props;
    return (
    <div className={classes.root}>
      <Chip
        label="Commerical" 
        color={this.ChipColor('Commerical')}
        onClick={() => {this.toggle('Commerical')}} 
        className={classes.chip} 
      />  
      <Chip
        label="Valunteer"  
        color={this.ChipColor('Valunteer')}
        onClick={() => {this.toggle('Valunteer')}} 
        className={classes.chip} 
      />  
      <Chip
        label="EcoTour"  
        color={this.ChipColor('EcoTour')}
        onClick={() => {this.toggle('EcoTour')}} 
        className={classes.chip} 
      />  
    </div>
    )
  }
}

TourCategory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TourCategory);