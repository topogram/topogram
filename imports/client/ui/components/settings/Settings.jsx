import React from 'react'
import TextField from 'material-ui/TextField';

import SideNavItem from '../sideNav/SideNavItem.jsx'
import { topogramDelete, topogramUpdateTitle } from '../../../../api/topograms/topogramsMethods.js'

console.log(topogramUpdateTitle);

export default class Settings extends React.Component {

  static propTypes = {
    topogramTitle : React.PropTypes.string
  }

  handleTitleChange = (event) => {
    let title = event.target.value;
    console.log(this.props.topogramId);
    topogramUpdateTitle.call({
      topogramId : this.props.topogramId,
      title
    })
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
