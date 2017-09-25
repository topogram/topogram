import React from 'react'
import moment from 'moment'
import { defineMessages, injectIntl } from 'react-intl'

import { Card, CardActions, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

// import DeleteTopogram from './DeleteTopogram.jsx'

const messages = defineMessages({
  browse : {
    'id': 'topogram.index.card.button.browse',
    'defaultMessage': 'Browse',
    'message': ''
  }
})

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
    let url = `/topograms/${this.props._id}`

    const { formatMessage } = this.props.intl

    return (
    <div
      style={listItemStyle}
      className={this.props.classNames}
    >
     <Card>
      <CardHeader
        title={this.props.title}
        subtitle={parsedDate}
        expandable={false}
      />
      <CardActions>
        <FlatButton
          label={formatMessage(messages.browse)}
          primary={true}
          href={url}
        />
        {/* <DeleteTopogram
          topogramName= {this.props.title}
          topogramId={this.props._id}
          router={this.props.router}
        /> */}
      </CardActions>
     </Card>
    </div>
  )}
})

export default injectIntl(TopogramListItem)
