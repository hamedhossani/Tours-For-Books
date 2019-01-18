import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom'; 

import { deleteTourById } from '../store/action'; 
import { fetchCurrentMessage } from '../../page/action';

class TourDeleteDialog extends React.Component {
 
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);
    // this.state = {
    //   open: false,
    // };
    console.log(props);
    // this.handleClose = this.handleClose.bind(this);
  }
  // componentWillReceiveProps(nextProps) {
  //   // console.log('componentWillReceiveProps', nextProps);
  //   // console.log(this.props);
  //   //if (this.props.open !== nextProps.open) 
  //   {
  //   //  this.setState({
  //   //    open : nextProps.open,
       
  //   //  });
  //   }
  //  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.open !== prevState.open) {
  //     return {
  //       open: nextProps.open
  //     };
  //   }
  //   // No state update necessary
  //   return null;
  // }
  // handleClickOpen () {
  //   this.setState({ open: true });
  // };
// componentDidUpdate(prevProps, prevState, snapshot){
//   console.log('prevProps');
//   console.log(prevProps);
//   console.log('prevState');
//   console.log(prevState);
//   console.log('snapshot');
//   console.log(snapshot);
// }
  // handleClose () {
  //   this.props.onClose();
  //   // this.setState({ open: false });
  //   console.log('open: false');
  //   //  console.log(this.state.open);
  //    //this.props.open = false;
  // };
  componentWillReceiveProps(newProps) {    
    console.log('Component WILL RECIEVE PROPS!');
    console.log(newProps);
    if(newProps.open == false){
      this.props.onClose();
    }
 }
//  shouldComponentUpdate(newProps, newState) {
//    if(newProps == this.props) return false;
//   return true;
// }
  render() {
    return (
      <div>
        {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open alert dialog
        </Button> */}
        <Dialog
          open={this.props.open }
          onClose={this.props.onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.tour.name+" !"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you Sure, Delete Tour by name "{this.props.tour.name}" ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button  color="primary" 
                     onClick={this.props.onClose} >
              Cancel
            </Button>
            <Button  color="secondary" variant="outlined" autoFocus
                     onClick={() => this.props.deleteTour()}
                    // onClick={() => dispatch(deleteTourById(this.props.tour.id)}
                      >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  // console.log('dispatch');
  // console.log(dispatch);
  console.log('ownProps');
  console.log(ownProps);
  console.log('mapDispatchToProps');
  return{
    deleteTour: () => dispatch(deleteTourById(ownProps.tour.id))
    // ,dispatchCurrentMessage: (message) => dispatch(fetchCurrentMessage(message))
  }
}
  const mapStateToProps = (state, props) => {
    console.log('delete mapStateToProps');
    const {  tourList , OpenTourDeleteDialog }  = state.AdminReducers.InitialToursReducer || false;
    if(OpenTourDeleteDialog != undefined)        
       return { open : OpenTourDeleteDialog };  

     return {};
  } 
// export default withRouter(connect(mapStateToProps)( TourDeleteDialog)); 
export default  connect(mapStateToProps,mapDispatchToProps)(TourDeleteDialog); 