import React from 'react'

import { Card, CardActions, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import DeleteConfirmationDialog from './DeleteConfirmationDialog.jsx'
import moment from 'moment'

const listItemStyle = {
  marginBottom: '2em'
}

const TopogramListItem = React.createClass({
  getDefaultProps() {
    return {
      title : '',
      _id : '',
      date: new Date(),
      editable : false
    }
  },
  render() {

    let parsedDate = (this.props.date) ?  moment(this.props.date).fromNow() : ''
    let url = '/topograms/'+this.props._id
    let dataUrl = '/topograms/' + this.props._id + '/lab'

    const deleteButton = ( !this.props.editable ) ? '' : <DeleteConfirmationDialog
      topogramName= {this.props.title}
      topogramId={this.props._id}
    />

    return (
    <div
      style={listItemStyle}
      className={this.props.classNames}
    >
     <Card>
      <CardHeader
        title={this.props.title}
        subtitle={parsedDate}
      />
      <CardActions>
        <FlatButton
          label="Browse"
          primary={true}
          href={url}
        />
        <FlatButton
          label="Data"
          secondary={true}
          href={dataUrl}
        />
        {deleteButton}
      </CardActions>
     </Card>
    </div>
  )}
})

export default TopogramListItem