import React from 'react'
import {Card, CardActions, CardHeader} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import moment from 'moment'

const TopogramListItem = React.createClass({
  getDefaultProps() {
    return {
      title : '',
      _id : '',
      date: new Date()
    }
  },
  render() {

    let parsedDate = (this.props.date) ?  moment(this.props.date).fromNow() : ''
    let url = '/topograms/'+this.props._id
    let dataUrl = '/topograms/' + this.props._id + '/lab'

    return (
    <div className={this.props.classNames}>
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
      </CardActions>
     </Card>
    </div>
  )}
})

export default TopogramListItem
