import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';

// Icons
import ItineraryIcon from 'material-ui-icons/FormatListBulleted';
import ServiceIcon from 'material-ui-icons/Announcement';

// Components
import TourItinerary from './TourItinerary';

function TabContainer(props) {
  return <div style={{ padding: '5%' }}>{props.children}</div>;
}

class TourDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: 0
    };
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event, value) {
    this.setState({ value });
  };

  render() {
    const { classes, tour } = this.props
    const { value } = this.state;
    return (
      <Paper elevation={2} className={classes.root}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Itinerary" />
          <Tab label="What's Included" />
          <Tab label="Excluded Fee" />
        </Tabs>
        <Divider light />
        {value === 0 && 
          <TabContainer><TourItinerary tour={tour} activities={tour.activities}/></TabContainer>
        }
        {value === 1 && 
          <TabContainer>
            <List>
              { tour.includes.map((item,i) => (
                <ListItem button key={i}>
                  <ListItemText
                    primary={item}
                  />
                </ListItem>
              ))}
            </List>
          </TabContainer>
        }
        {value === 2 && 
          <TabContainer>
            <List>
              { tour.excludes.map((item,i) => (
                <ListItem button key={i}>
                  <ListItemText
                    primary={item}
                  />
                </ListItem>
              ))}
            </List>
          </TabContainer>
        }
      </Paper>
    )
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit,
    backgroundColor: theme.palette.background.paper,
  },
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(TourDetail);