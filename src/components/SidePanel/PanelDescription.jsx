import React, {PropTypes} from 'react'
import { CardTitle, CardText } from 'material-ui/Card'
import moment from 'moment'

const PanelDescription = ({
  topogram,
  nodesCount,
  edgesCount
}) => (
  <span>
    <CardTitle
      title={topogram.title}
      titleStyle={{ fontSize : '14pt', lineHeight : '1em' }}
      subtitle={`${nodesCount} nodes, ${edgesCount} edges`}
      />
    <CardText>
      {topogram.description}

      <p>Last modified {moment(topogram.lastModified).fromNow()}</p>
      <p>Created {moment(topogram.createdAt).fromNow()}</p>
    </CardText>

  </span>
)

export default PanelDescription
