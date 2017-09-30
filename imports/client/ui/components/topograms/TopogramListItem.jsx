import React from 'react'
import moment from 'moment'
import { defineMessages, injectIntl } from 'react-intl'

import { Link } from 'react-router';

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';

import FlatButton from 'material-ui/FlatButton';
import EyeIcon from 'material-ui/svg-icons/action/visibility';

// import FlatButton from 'material-ui/FlatButton'
// import DeleteTopogram from './DeleteTopogram.jsx'

const messages = defineMessages({
  browse : {
    'id': 'topogram.index.card.button.browse',
    'defaultMessage': 'Browse',
    'message': ''
  }
})

const style = {
  marginBottom: '2em'
}

const TopogramListItem = ({title, topogramId, lastModified}) => (
  <Card>
    <CardTitle
      title={title}
      // title={<Link to={`/topograms/${topogramId}`}>{title}</Link>}
      titleStyle={{fontSize:'13pt', lineHeight:'1.1em', paddingBottom : '.2em', cursor : 'pointer'}}
      subtitle={<span>{moment(lastModified).fromNow()}</span>}
      />
    <CardActions>
      <FlatButton
        href={`/topograms/${topogramId}`}
        // labelPosition="before"
        label="Browse"
      />
    </CardActions>
  </Card>
)

export default TopogramListItem
