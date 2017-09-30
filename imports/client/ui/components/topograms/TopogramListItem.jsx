import React from 'react'
import moment from 'moment'
import { defineMessages, injectIntl } from 'react-intl'

import { Link } from 'react-router';

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

import EyeIcon from 'material-ui/svg-icons/action/visibility';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Settings from '../settings/Settings.jsx'

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

const TopogramListItem = ({
  topogramTitle,
  topogramId,
  topogramSharedPublic,
  lastModified,
  router
}) => (
  <Card>
    <CardTitle
      title={topogramTitle}
      // title={<Link to={`/topograms/${topogramId}`}>{title}</Link>}
      titleStyle={{fontSize:'13pt', lineHeight:'1.1em', paddingBottom : '.2em'}}
      subtitle={<span>{moment(lastModified).fromNow()}</span>}
      />
    <CardActions>
      <FlatButton
        href={`/topograms/${topogramId}`}
        // labelPosition="before"
        label="Browse"
      />

      {/* <IconMenu
         iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
       >
        <Settings
          topogramId={topogramId}
          topogramTitle={topogramTitle}
          topogramSharedPublic={topogramSharedPublic}
          router={router}
          />
      </IconMenu> */}

    </CardActions>
  </Card>
)

export default TopogramListItem
