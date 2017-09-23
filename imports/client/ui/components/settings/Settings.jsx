import React from 'react'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import SideNavItem from '../sideNav/SideNavItem.jsx'
import DeleteConfirmationDialog from '../topograms/DeleteConfirmationDialog.jsx'
import { topogramDelete, topogramUpdateTitle } from '../../../../api/topograms/topogramsMethods.js'

export default class Settings extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: this.props.topogramTitle
    }
  }

  static propTypes = {
    topogramTitle : React.PropTypes.string
  }

  componentWillReceiveProps(nextProps) {
    console.log('got new props');
    let {title} = nextProps
    this.setState({title})
  }

  handleTitleChange = (event) => {
    this.setState({title : event.target.value})
  }

  handleClickUpdateTitle = (event) => {
    topogramUpdateTitle.call({
      topogramId : this.props.topogramId,
      title : this.state.title
    })
  }

  render() {
    return (
      <SideNavItem
        title="Settings"
        subtitle="Tweak stuff"
        >
          <TextField
            floatingLabelText="Edit Title"
            value={this.state.title}
            onChange={this.handleTitleChange}
            floatingLabelFixed={true}
            multiLine={true}
            rows={3}
          />
          <RaisedButton
            label="Update Title"
            onClick={ e=> this.handleClickUpdateTitle(e)}
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
