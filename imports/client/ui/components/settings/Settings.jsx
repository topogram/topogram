import React from 'react'
import TextField from 'material-ui/TextField';

import SideNavItem from '../sideNav/SideNavItem.jsx'

export default class Settings extends React.Component {

  static propTypes = {
    topogramTitle : React.PropTypes.string
  }

  handleTitleChange = (event) => {
    console.log(event.target.value);
  }

  render() {
    return (
      <SideNavItem
        title="Settings"
        subtitle="Tweak stuff"
        initiallyExpanded={true}
        >
          <TextField
            hintText="Hint Text"
            floatingLabelText="Title of the Topogram"
            value={this.props.topogramTitle}
            onChange={this.handleTitleChange}
            floatingLabelFixed={true}
            multiLine={true}
            rows={3}
          />
      </SideNavItem>
    )
  }
}
