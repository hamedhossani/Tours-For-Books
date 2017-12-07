import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';

// Icons
import ItineraryIcon from 'material-ui-icons/FormatListBulleted';
import ServiceIcon from 'material-ui-icons/Announcement';

function TabContainer(props) {
  return <div style={{ padding: 8 * 3 }}>{props.children}</div>;
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
      <div>
        <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<ItineraryIcon />} label="Itinerary" />
          <Tab icon={<ServiceIcon />} label="Important" />
        </Tabs>
        <Divider light />
        {value === 0 && <TabContainer>Item One</TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
      </div>
    )
  }
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        backgroundColor: theme.palette.background.paper,
    },
});

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(TourDetail);