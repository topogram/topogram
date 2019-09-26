import React, { PropTypes } from 'react'
import moment from 'moment'
// import { defineMessages, injectIntl } from 'react-intl'

import { Card, CardActions, CardTitle, CardHeader } from 'material-ui/Card'

// import IconMenu from 'material-ui/IconMenu'
// import IconButton from 'material-ui/IconButton'
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
// import Settings from '../settings/Settings.jsx'

import RaisedButton from 'material-ui/FlatButton'

// const messages = defineMessages({
//   browse : {
//     'id': 'topogram.index.card.button.browse',
//     'defaultMessage': 'Browse',
//     'message': ''
//   }
// })


const TopogramListItem = ({
  topogramTitle,
  topogramDesc,
  topogramVersion,
  topogramId,
  lastModified,
  author
  // topogramSharedPublic,
  // router
}) => (
  <Card>
    <CardTitle
      title={topogramTitle}
      // title={<Link to={`/topograms/${topogramId}`}>{title}</Link>}
      titleStyle={{ fontSize:'13pt', lineHeight:'1.1em', paddingBottom : '.2em' }}
      subtitle={
        <span>
          { author ? `By ${author ? author : 'Author'}` : ' By Gregory Bahde' } &bull; {moment(lastModified).fromNow()}
        </span>
      }
//      content={topogramDesc}
      subtitleStyle={{ fontSize:'8pt'/*, lineHeight:'1.1em', paddingBottom : '.2em'*/ }}

    />
    <CardHeader


    title={topogramDesc}
    titleStyle={{ fontSize:'8pt'/*, lineHeight:'0.8em', paddingBottom : '.2em'*/ }}
    subtitle={topogramVersion}
    subtitleStyle={{ fontSize:'7pt'/*, lineHeight:'0.8em', paddingBottom : '.2em'*/ }}

/>
    <CardActions>
      <RaisedButton


      style={{
        color:"black", backgroundColor:"#A98CC5"
      }}
        //href={`/topograms/${topogramId}`}
        // labelPosition="before"
        onClick={ ()=>window.open(`/topograms/${topogramId}`, '_blank')}
        label="Check its tours"
      />
    </CardActions>

  </Card>
)

TopogramListItem.propTypes = {
  author : PropTypes.string,
  topogramTitle: PropTypes.string.isRequired,
  topogramDesc: PropTypes.string,
  topogramVersion: PropTypes.string,
  topogramId: PropTypes.string.isRequired,
  lastModified: PropTypes.instanceOf(Date).isRequired
}


export default TopogramListItem
