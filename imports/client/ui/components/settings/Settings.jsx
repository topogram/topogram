import React from 'react'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import SideNavItem from '../sideNav/SideNavItem.jsx'
import DeleteConfirmationDialog from '../topograms/DeleteConfirmationDialog.jsx'
import { topogramDelete, topogramUpdateTitle } from '../../../../api/topograms/topogramsMethods.js'

export default class Settings extends React.Component {

  static propTypes = {
    topogramTitle : React.PropTypes.string
  }

  handleTitleChange = (event) => {
    topogramUpdateTitle.call({
      topogramId : this.props.topogramId,
      title : event.target.value
    })
  }

  render() {
    return (
      <SideNavItem
        title="Settings"
        subtitle="Tweak stuff"
        >
          <TextField
            hintText="Hint Text"
            floatingLabelText="Edit Title"
            value={this.props.topogramTitle}
            onChange={this.handleTitleChange}
            floatingLabelFixed={true}
            multiLine={true}
            rows={3}
          />
          <DeleteConfirmationDialog
            topogramName= {this.props.topogramTitle}
            topogramId={this.props.topogramId}
            router={this.props.router}
          />
      </SideNavItem>
    )
  }
}
