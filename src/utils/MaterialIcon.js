import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

// Styles
import Avatar from 'material-ui/Avatar';
import ExploreIcon from 'material-ui-icons/LocalSee';
import DiningIcon from 'material-ui-icons/LocalDining';
import ExperienceIcon from 'material-ui-icons/NaturePeople';
import GuiderIcon from 'material-ui-icons/SupervisorAccount';
import WalkingIcon from 'material-ui-icons/DirectionsWalk';
import BikingIcon from 'material-ui-icons/DirectionsBike';

const Icon = (props) => {
    const { iconName } = props;
    switch(iconName) {
        case 'LocalDining':
            return <DiningIcon />
        case 'NaturePeople':
            return <ExperienceIcon />
        case 'LocalSee':
            return <ExploreIcon />
        case 'SupervisorAccount':
            return <GuiderIcon />
        case 'Guider':
            return <GuiderIcon />
        case 'Walking':
            return <WalkingIcon />
        case 'Bicycle':
            return <BikingIcon />
        default:
            return null
    }
}

function getColor(iconName) {
    switch(iconName) {
        case 'LocalDining':
            return ['#fff', '#FFBB00']
        case 'NaturePeople':
            return ['#fff','#00A54D']
        case 'LocalSee':
            return ['#fff','#0099FF']
        case 'Guider':
            return ['#fff','#E5008D']
        case 'Walking':
            return ['rgba(0, 0, 0, 0.4)','rgba(0,0,0,0)']
        case 'Bicycle':
            return ['rgba(0, 0, 0, 0.4)','rgba(0,0,0,0)']
        default:
            return []
    }
}

const MaterialIcon = (props) => {
  const { iconName, children, classes, className, onClick } = props;
  const colorSet = getColor(iconName)
  return (
    <div className={classNames(
        className,
      )}
      onClick={onClick}
    >
      {children}
        <Avatar style={{color: colorSet[0], backgroundColor: colorSet[1]}}>
            <Icon iconName={iconName}/>
        </Avatar>
    </div>
  );
}

export default MaterialIcon;
