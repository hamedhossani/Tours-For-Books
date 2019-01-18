import React, {
  Component,
  createRef
} from 'react';
import PropTypes from 'prop-types';
//import { auth } from './firebase/index';
import TextField from '@material-ui/core/TextField';
// import { withStyles } from '@material-ui/core/styles';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Tour from '../class/Tour';

import { withFirebase } from 'react-redux-firebase'
import { compose, withHandlers } from 'recompose'
import green from '@material-ui/core/colors/green';

import { addTour, editTour, fetchOneTourById } from '../store/action';

// import {db} from './firebase/firebase2';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: '0.8rem',
    marginRight: '0.8rem',
    //width: 200,
  },
  formControl: {
    marginLeft: theme.spacing.unit + 50,
    marginRight: theme.spacing.unit + 50,
    // margin: theme.spacing.unit,
    // minWidth: 80,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: {
    useNextVariants: true,
  },
});
class TourAdd extends Component {
  constructor(props) {
    super(props);

    console.log('props tour add');
    console.log(props);

    this.name = createRef();
    this.description = createRef();
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleChange = this.handleChange.bind(this);

    var tour = new Tour();


    this.state = props.tour || new Tour();
    this.state.id = props.id || undefined;

    // this.state.name = props.name || '';
    // this.state.type = props.type || '';
    // this.state.boughts = props.boughts || '';
    // this.state.description = props.description || '';

    // this.state.price.amount = props.price.amount;
    // this.state.price.discountAmount = props.price.discountAmount;
    // this.state.price.currency = props.price.currency;
    // this.state.price.type = props.price.type;
    // this.state.price.unit = props.price.unit;

    // this.state.lenghts.byDay = props.lenghts.byDay;
    // this.state.lenghts.byHour = props.lenghts.byHour;

    console.log('Tour tour add');
    console.log(this.state);

    console.log('fetchOneTourById tour add');
    if(this.state.id != undefined)
      this.props.dispatch(fetchOneTourById(this.state.id));//.then((e)=>{ 
    // console.log('dispatch fetchOneTourById');
    //});
    // console.log(this.state);
    //fetchOneTourById
    console.log('props tour add');
    console.log(props);
    // this.handleChange2 = this.handleChange2.bind(this);
  }

  handleSuccess() {
    this.resetForm();
    this.props.onSuccess && this.props.onSuccess();
  }

  handleErrors(reason) {
    this.props.onError && this.props.onError(reason);
  }

  resetForm() {
    if (!this.name.current || !this.description.current) { return }
    const { name, description } = Form.defaultProps;

    this.name.current.value = name;
    this.description.current.value = description;
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log(this.state);
    console.log('props');
    console.log(this.props);

    var tour = new Tour();
    tour.id = this.state.id;
    tour.name = this.state.name;
    tour.type = this.state.type;
    tour.boughts = this.state.boughts;
    tour.description = this.state.description;

    tour.price.amount = this.state.price.amount;
    tour.price.discountAmount = this.state.price.discountAmount;
    tour.price.currency = this.state.price.currency;
    tour.price.type = this.state.price.type;
    tour.price.unit = this.state.price.unit;

    tour.lenghts.byDay = this.state.lenghts.byDay;//lenghts.byDay;
    tour.lenghts.byHour = this.state.lenghts.byHour;

    console.log('tour before submit');
    console.log(tour);
    if (tour.id == 0 || tour.id == '')//add
    {
      this.props.dispatch(addTour(tour)).then((e) => {
        console.log('dispatch addTour');
      });
    } else {
      this.props.dispatch(editTour(tour)).then((e) => {
        console.log('dispatch edit Tour');
      });
    }
    // var  result= this.props.firebase.push('tours_test', tour);
    // console.log(result);
  }
  componentWillReceiveProps(newProps) {
    console.log('Component WILL RECIEVE PROPS!')
    console.log(newProps);
    if (this.state !== newProps.tour) {
      this.setState({
        modePage: 'Edit',
        name: newProps.tour.name,
        type: newProps.tour.type || '',
        boughts: newProps.tour.boughts || '',
        description: newProps.tour.description,
        price: {
          amount: (newProps.tour.price) ? newProps.tour.price.amount || '' : '',
          discountAmount: (newProps.tour.price) ? newProps.tour.price.discountAmount || '' : '',
          currency: (newProps.tour.price != undefined) ? newProps.tour.price.currency || '' : '',
          type: (newProps.tour.price) ? newProps.tour.price.type || '' : '',
          unit: (newProps.tour.price) ? newProps.tour.price.unit || '' : ''
        },
        lenghts: {
          byDay: (newProps.tour.lenghts) ? newProps.tour.lenghts.byDay || '' : '',
          byHour: (newProps.tour.lenghts) ? newProps.tour.lenghts.byHour || '' : ''
        }
      });
    }

    console.log('Component WILL RECIEVE PROPS!')
    console.log(this.state);
  }
  handleChange(event) {
    console.log('handleChange');
    event.preventDefault();
    var field = event.target.name;
    var value = event.target.value;

    if (field.includes('.')) {
      var fieldSplit = field.split(".");

      var field0 = fieldSplit[0];
      var field1 = fieldSplit[1];

      this.setState(prevState => (
        {
          ...prevState,
          [field0]: { ...prevState[field0], [field1]: value }
        }
      ));
    } else {
      this.setState({
        [field]: value
      });
    }
  };

  handleChange2(field, event) {

    event.preventDefault();
    console.log('handleChange2 ' + field);
    var value = event.target.value;
    this.setState({
      [field]: value
    });
  };
  render() {
    const { classes } = this.props;
    console.log('this.state');
    console.log(this.state);
    return (
      <Card>
        <CardContent>
          <h3>
            {(this.state.modePage == undefined || this.state.modePage == '') ? 'Add ' : this.state.modePage + ' '}
            Tour</h3>
          <hr />
          <form className={styles.container}>
            <div className="row">
              <Grid container>
                <Grid item xs={6}>
                  <div className="input-field">
                    <TextField
                      className={styles.textField}
                      label="Name"
                      type="text"
                      name="name"
                      onChange={this.handleChange}
                      margin="normal"
                      fullWidth
                      value={this.state.name}
                    />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <FormControl className={styles.formControl}>
                    <InputLabel htmlFor="type">Type</InputLabel>
                    <Select
                      value={this.state.type}
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'type',
                        id: 'type',
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value='custom'>Custom</MenuItem>
                      <MenuItem value='local'>local</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    className={styles.textField}
                    label="Boughts"
                    type="number"
                    name="boughts"
                    onChange={this.handleChange}
                    margin="normal"
                    value={this.state.boughts}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={styles.textField}
                    label="Description"
                    type="text"
                    name="description"
                    onChange={this.handleChange}
                    margin="normal"
                    multiline
                    fullWidth
                    value={this.state.description}
                  />
                </Grid>
                <Grid item xs={6}>
                  <fieldset>
                    <legend>Lenght</legend>
                    <TextField
                      className={styles.textField}
                      label="Day"
                      type="text"
                      name="lenghts.byDay"
                      onChange={this.handleChange}
                      margin="normal"
                      value={this.state.lenghts.byDay}
                    />

                    <TextField
                      className={styles.textField}
                      label="Hour"
                      type="number"
                      name="lenghts.byHour"
                      onChange={this.handleChange}
                      margin="normal"
                      value={this.state.lenghts.byHour}
                    />
                  </fieldset>
                </Grid>
                <Grid item xs={12}>
                  <fieldset>
                    <legend>Price</legend>
                    <TextField
                      className={styles.textField}
                      label="Amount"
                      type="number"
                      name="price.amount"
                      onChange={this.handleChange}

                      value={this.state.price.amount}
                    />
                    <TextField
                      className={styles.textField}
                      label="Discount Amount"
                      type="number"
                      name="price.discountAmount"
                      onChange={this.handleChange}

                      value={this.state.price.discountAmount}
                    />
                    <FormControl className={styles.formControl}>
                      <InputLabel htmlFor="currency">Currency</InputLabel>
                      <Select
                        value={this.state.price.currency}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'price.currency',
                          id: 'price_currency',
                        }}
                      >
                        <MenuItem value=''>None</MenuItem>
                        <MenuItem value='dollar'>Dollar</MenuItem>
                      </Select>
                    </FormControl>
                    <br />
                    <TextField
                      className={styles.textField}
                      label="Unit"
                      type="number"
                      name="price.unit"
                      onChange={this.handleChange}

                      value={this.state.price.unit}
                    />

                  </fieldset>
                </Grid>
                <Grid item xs={12}>
                  {/* <Button variant="outlined" color="primary" className={styles.button} onClick={this.handleSubmit.bind(this)}>
                          Submit
                          </Button>   */}
                  <br />
                  <MuiThemeProvider theme={theme}>
                    <Button variant="contained" color="primary" variant="outlined" onClick={this.handleSubmit.bind(this)}>
                      <SaveIcon />
                      Submit
                            </Button>
                  </MuiThemeProvider>
                </Grid>
              </Grid>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }
}

TourAdd.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
  // ,
  // onSuccess: PropTypes.func,
  // onError: PropTypes.func
}

TourAdd.defaultProps = {
  name: '',
  description: ''
}
//   const mapStateToProps = (state, props) => {
//     const {email ,password}  = state ;
//     return { 
//       email ,
//       password 
//     }; 
//   } 

//export default withRouter(TourAdd);
// const enhance = compose(
//  withFirebase
// withHandlers({
//   addSampleTodo: props => () => {
//     const sampleTodo = { text: 'Sample', done: false }
//     return props.firebase.push('todos', sampleTodo)
//   }
// })
// )
const mapStateToProps = state => {
  console.log('tour edit mapStateToProps state');
  console.log(state);
  // const {  message, messageOpen }  = state.MessageReducer.CurrentMessageReducer ; 
  const { tour } = state.AdminReducers.InitialToursReducer;
  // this.setState( {
  //   OpenTourDeleteDialog : OpenTourDeleteDialog
  // });
  return {
    tour
  };
};
//  export default enhance(TourAdd);
export default connect(mapStateToProps)(TourAdd);