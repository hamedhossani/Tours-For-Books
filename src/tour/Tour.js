import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Style
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemText,
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import ShareIcon from 'material-ui-icons/Share';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

// Image
import getImage from '../utils/getImage';
import MaterialIcon from '../utils/MaterialIcon';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  card: {
    maxWidth: '100%',
    position: 'relative'
  },
  media: {
    height: 200,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  price: {
    display: 'flex',
    marginLeft: '16px',
    '& h1 + h1':{
      marginLeft: '5px'
    }
  },
  shareButton: {
    color: 'white',
    position: 'absolute',
    top: '3px',
    right: '3px'
  },
  tag: {
    opacity: 0.9,
    backgroundColor: theme.palette.secondary[500],
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    textTransform: 'uppercase',
    position: 'absolute',
    top: 0,
    left: 0
  }
});

class Tour extends Component {
  constructor(props) {
    super(props);
    this.state={
      imgUrl:'',
      expanded: false
    }
    this.handleExpandClick = this.handleExpandClick.bind(this)
  }
  componentDidMount(){
    const { tour } = this.props;
    getImage.url(`tourImg/${tour.images[0]}.jpg`).then((url) => {
      this.setState({
        imgUrl: url
      });
    })
  }
  handleExpandClick(){
    this.setState({ expanded: !this.state.expanded });
  };
  render() {
    const { classes, tour } = this.props;
    return (
      <Grid item xs={12} sm={6} >
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={`${this.state.imgUrl}`}
            title={tour.name}
          />
          <CardContent>
            <Typography type='title'>
              {tour.name}
            </Typography>
            <Typography component="p">
              {tour.description}
            </Typography>
          </CardContent>
          <CardActions disableActionSpacing>
            <div className={classes.price}>
              <Typography type='display2'>${tour.price.amount}</Typography>
              <Typography type='display1'>${tour.price.discountAmount}</Typography>
            </div>
            <div className={classes.flexGrow} />
            <IconButton onClick={this.handleExpandClick}>
              {this.state.expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </CardActions>
          <Divider light />
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <List>
                { tour.highlights.map(hl => (
                <ListItem>
                  <ListItemAvatar>
                    <MaterialIcon key={hl.icon} iconName={hl.icon} backgroundColor={hl.bgColor}/>
                  </ListItemAvatar>
                  <ListItemText
                    primary={hl.name}
                  >
                  </ListItemText>
                </ListItem>
                ))}
              </List>
            </CardContent>
          </Collapse>
          <IconButton className={classes.shareButton} aria-label="Share">
            <ShareIcon />
          </IconButton>
          <div className={classes.tag}><Typography type='body2'>{tour.boughts}+ bought</Typography></div>
        </Card>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
    return { domain : 'yourdomain.com'
    }
}

export default withStyles(styles)(Tour);