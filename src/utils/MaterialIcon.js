import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

// Styles
import Avatar from 'material-ui/Avatar';
import ExploreIcon from 'material-ui-icons/LocalSee';
import DiningIcon from 'material-ui-icons/LocalDining';
import ExperienceIcon from 'material-ui-icons/NaturePeople';
import GuiderIcon from 'material-ui-icons/SupervisorAccount';

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
        default:
            return null
    }
}
const MaterialIcon = (props) => {
  const { iconName, backgroundColor, children, classes, className, onClick } = props;
  return (
    <div className={classNames(
        className,
      )}
      onClick={onClick}
    >
      {children}
        <Avatar style={{color: '#fff', backgroundColor: backgroundColor}}>
            <Icon iconName={iconName}/>
        </Avatar>
    </div>
  );
}

export default MaterialIcon;
